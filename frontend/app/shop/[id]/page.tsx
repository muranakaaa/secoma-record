/// <reference types="@types/google.maps" />
'use client';

import { useParams } from 'next/navigation';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import { useUserState } from '../../hooks/useGlobalState';

type Shop = {
  id: number;
  name: string;
  address: string;
  latitude: number | null;
  longitude: number | null;
};

type Visit = {
  id: number;
  shop_id: number;
  visit_date: string;
  comment: string | null;
};

const ShopDetailPage = () => {
  const { id } = useParams();
  const [user] = useUserState();
  const [shop, setShop] = useState<Shop | null>(null);
  const [visits, setVisits] = useState<Visit[]>([]);
  const [date, setDate] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/shops/${id}`);
        if (!response.ok) throw new Error('店舗情報の取得に失敗しました。');
        const data = await response.json();
        setShop(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : '不明なエラー');
      }
    };

    fetchShop();
  }, [id]);

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/visits?shop_id=${id}`);
        if (!response.ok) throw new Error('訪問記録の取得に失敗しました。');
        const data = await response.json();
        setVisits(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchVisits();
  }, [id]);

  useEffect(() => {
    if (isGoogleMapsLoaded && shop) {
      const latitude = shop.latitude ? parseFloat(shop.latitude.toString()) : null;
      const longitude = shop.longitude ? parseFloat(shop.longitude.toString()) : null;

      if (latitude === null || longitude === null || isNaN(latitude) || isNaN(longitude)) {
        setError('地図を表示するための座標が無効です。');
        return;
      }

      const mapElement = document.getElementById('map') as HTMLElement;
      const mapOptions: google.maps.MapOptions = {
        center: { lat: latitude, lng: longitude },
        zoom: 15,
      };

      const map = new google.maps.Map(mapElement, mapOptions);

      new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map,
        title: shop.name,
      });
    }
  }, [isGoogleMapsLoaded, shop]);

  const handleCreateOrUpdate = async () => {
    if (!user.isSignedIn) {
      alert('ログインしてください');
      return;
    }

    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing
      ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/visits/${isEditing}`
      : `${process.env.NEXT_PUBLIC_API_BASE_URL}/visits`;

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'access-token': localStorage.getItem('access-token') || '',
        'client': localStorage.getItem('client') || '',
        'uid': localStorage.getItem('uid') || '',
      },
      body: JSON.stringify({
        shop_id: id,
        visit_date: date,
        comment,
      }),
    });

    if (response.ok) {
      const newVisit = await response.json();
      setVisits((prev) =>
        isEditing
          ? prev.map((v) => (v.id === newVisit.id ? newVisit : v))
          : [...prev, newVisit]
      );
      setDate('');
      setComment('');
      setIsEditing(null);
    } else {
      alert('エラーが発生しました');
    }
  };

  const handleDelete = async (visitId: number) => {
    if (!user.isSignedIn) {
      alert('ログインしてください');
      return;
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/visits/${visitId}`, {
      method: 'DELETE',
      headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      'access-token': localStorage.getItem('access-token') || '',
      client: localStorage.getItem('client') || '',
      uid: localStorage.getItem('uid') || '',
    },
    });

    if (response.ok) {
      setVisits((prev) => prev.filter((v) => v.id !== visitId));
    } else {
      alert('削除に失敗しました');
    }
  };

  if (error) {
    return (
      <div className="p-6 text-red-500">
        <h1>エラー</h1>
        <p>{error}</p>
      </div>
    );
  }

  if (!shop) {
    return (
      <div className="p-6">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`}
        strategy="lazyOnload"
        onLoad={() => {
          console.log('Google Maps API Loaded');
          setIsGoogleMapsLoaded(true);
        }}
        onError={() => {
          console.error('Failed to load Google Maps API');
          setError('Google Maps API の読み込みに失敗しました。');
        }}
      />

      <h1 className="text-2xl font-bold">店舗詳細</h1>
      <p>住所: {shop.address}</p>

      <div id="map" className="w-6/12 h-96 mt-2"></div>

      <h2 className="text-xl font-bold mt-4">訪問記録</h2>
      <div>
        {visits.map((visit) => (
          <div key={visit.id} className="p-2 border mb-2">
            <p>日付: {visit.visit_date}</p>
            <p>コメント: {visit.comment || 'なし'}</p>
            {user.isSignedIn && (
              <>
                <button onClick={() => {
                  setDate(visit.visit_date);
                  setComment(visit.comment || '');
                  setIsEditing(visit.id);
                }}>
                  編集
                </button>
                <button onClick={() => handleDelete(visit.id)}>削除</button>
              </>
            )}
          </div>
        ))}
      </div>

      {user.isSignedIn && (
        <div className="mt-4">
          <h3>{isEditing ? '訪問記録を編集' : '新規訪問記録を作成'}</h3>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="block mb-2"
          />
          <textarea
            placeholder="コメント（任意）"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="block mb-2"
          />
          <button onClick={handleCreateOrUpdate}>
            {isEditing ? '更新' : '作成'}
          </button>
        </div>
      )}

      {!user.isSignedIn && <p>ログインしてください。</p>}
    </div>
  );
};

export default ShopDetailPage;
