'use client';

import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { CalendarIcon, ChevronLeft, PenIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import Script from 'next/script';
import { useEffect, useState } from 'react';
import { Button } from "../../components/ui/button";
import { Calendar } from "../../components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover";
import { Textarea } from "../../components/ui/textarea";
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
  user_id: number;
  visit_date: string;
  comment: string | null;
};

const ShopDetailPage = () => {
  const { id } = useParams();
  const [user] = useUserState();
  const [shop, setShop] = useState<Shop | null>(null);
  const [visits, setVisits] = useState<Visit[]>([]);
  const [date, setDate] = useState<Date | null>(null);
  const [comment, setComment] = useState<string>('');
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);
  const searchParams = useSearchParams();
  const subArea = searchParams.get("sub_area") || "";
  const area = searchParams.get("area") || "";

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
    if (!user.isSignedIn || !user.id) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/visits?shop_id=${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'access-token': localStorage.getItem('access-token') || '',
          'client': localStorage.getItem('client') || '',
          'uid': localStorage.getItem('uid') || '',
        },
      });

      if (!response.ok) throw new Error('訪問記録の取得に失敗しました。');
        const data: Visit[] = await response.json();

        setVisits(data.filter((visit) => visit.user_id === user.id));
    } catch (err) {
      console.error(err);
    }
  };

  fetchVisits();
}, [id, user.isSignedIn, user.id]);

  useEffect(() => {
    if (isGoogleMapsLoaded && shop) {
      if (!window.google || !google.maps) {
        setError('Google Maps API が正しくロードされていません。');
        return;
      }

      const latitude = shop.latitude ? parseFloat(shop.latitude.toString()) : null;
      const longitude = shop.longitude ? parseFloat(shop.longitude.toString()) : null;

      if (latitude === null || longitude === null || isNaN(latitude) || isNaN(longitude)) {
        setError('地図を表示するための座標が無効です。');
        return;
      }

      const map = new google.maps.Map(
        document.getElementById('map') as HTMLElement,
        {
          center: { lat: latitude, lng: longitude },
          zoom: 15,
        }
      );

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
      setDate(null);
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
     <main className="container mx-auto px-4 py-8">
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
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <Link
            href={`/shop?sub_area=${encodeURIComponent(subArea)}&area=${encodeURIComponent(area)}`}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-2">
            <ChevronLeft className="w-4 h-4 mr-1" />
            {subArea}の店舗一覧に戻る
          </Link>
          <CardTitle className="text-2xl font-bold">{shop.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">住所</h3>
            <p>{shop.address}</p>
          </div>
          <div id="map" className="w-full h-96 mt-2"></div>
          <h3 className="text-lg font-semibold">訪問記録</h3>
{user.isSignedIn ? (
  <div>
    {visits.length > 0 ? (
      visits.map((visit) => (
        <div key={visit.id} className="space-y-2">
          <p>
            <strong>訪問日: </strong>
            {format(new Date(visit.visit_date + "T00:00:00Z"), "yyyy-MM-dd", { locale: ja })}
          </p>
          <p>
            <strong>コメント: </strong>{visit.comment || 'なし'}
          </p>
          {user.isSignedIn && (
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setDate(new Date(visit.visit_date + "T00:00:00Z"));
                  setComment(visit.comment || '');
                  setIsEditing(visit.id);
                }}
              >
                <PenIcon className="w-4 h-4 mr-2" />編集
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleDelete(visit.id)}>
                <TrashIcon className="w-4 h-4 mr-2" />削除
              </Button>
            </div>
          )}
        </div>
                ))
              ) : (
                <p>訪問記録がありません。</p>
              )}
            </div>
          ) : (
            <p>ログインしてください。</p>
          )}
          {user.isSignedIn && (
            (isEditing !== null || visits.length === 0) && (
              <div className="flex flex-col space-y-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "yyyy-MM-dd", { locale: ja }) : "日付を選択"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date || undefined}
                      onSelect={(selectedDate) => {
                        if (selectedDate) {
                          const localDate = new Date(
                            Date.UTC(
                              selectedDate.getFullYear(),
                              selectedDate.getMonth(),
                              selectedDate.getDate()
                            )
                          );
                          setDate(localDate);
                        }
                      }}
                      locale={ja}
                    />
                  </PopoverContent>
                </Popover>
                <Textarea
                  placeholder="訪問の感想や記録を入力してください（任意）"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="block mb-2"
                />
                <Button onClick={handleCreateOrUpdate}>
                  {isEditing ? '更新' : '作成'}
                </Button>
              </div>
            )
          )}
        </CardContent>
      </Card>
    </main>
  );
};

export default ShopDetailPage;