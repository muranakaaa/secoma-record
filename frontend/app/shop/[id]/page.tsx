'use client';

import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';
import useSWR from 'swr';
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
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

const fetcher = (url: string) => fetch(url, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "access-token": localStorage.getItem("access-token") || "",
    "client": localStorage.getItem("client") || "",
    "uid": localStorage.getItem("uid") || "",
  },
}).then(res => {
  if (!res.ok) throw new Error("データの取得に失敗しました。");
  return res.json();
});

const ShopDetailPage = () => {
  const { id } = useParams();
  const [user] = useUserState();
  const [date, setDate] = useState<Date | null>(null);
  const [comment, setComment] = useState<string>('');
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const searchParams = useSearchParams();
  const subArea = searchParams.get("sub_area") || "";
  const area = searchParams.get("area") || "";
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);

  // 店舗情報の取得
  const { data: shop, error: shopError } = useSWR(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/shops/${id}`,
    fetcher
  );

  // 訪問記録の取得（ユーザーがログインしている場合のみ）
  const { data: visits, error: visitsError } = useSWR(
    user.isSignedIn && user.id ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/visits?shop_id=${id}` : null,
    fetcher
  );

  // Google Maps 初期化
  useEffect(() => {
    if (!shop || !isGoogleMapsLoaded || !mapRef.current) return;

    if (!window.google || !google.maps) {
      console.error('Google Maps API がロードされていません');
      return;
    }

    const latitude = shop.latitude ? parseFloat(shop.latitude.toString()) : null;
    const longitude = shop.longitude ? parseFloat(shop.longitude.toString()) : null;

    if (latitude === null || longitude === null || isNaN(latitude) || isNaN(longitude)) {
      console.error('地図を表示するための座標が無効です');
      return;
    }

    const map = new google.maps.Map(mapRef.current, {
      center: { lat: latitude, lng: longitude },
      zoom: 15,
    });

    new google.maps.Marker({
      position: { lat: latitude, lng: longitude },
      map,
      title: shop.name,
    });
  }, [isGoogleMapsLoaded, shop]);

  if (shopError || visitsError) {
    return (
      <div className="p-6 text-red-500">
        <h1>エラー</h1>
        <p>{shopError?.message || visitsError?.message || "不明なエラー"}</p>
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
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&callback=initMap`}
        strategy="lazyOnload"
        onLoad={() => setIsGoogleMapsLoaded(true)}
        onError={() => console.error('Google Maps API の読み込みに失敗しました。')}
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
          {/* Google Map を表示する要素 */}
          <div ref={mapRef} className="w-full h-96 mt-2"></div>
          <h3 className="text-lg font-semibold">訪問記録</h3>
          {user.isSignedIn ? (
            <div>
              {visits?.length > 0 ? (
                visits.map((visit) => (
                  <div key={visit.id} className="space-y-2">
                    <p>
                      <strong>訪問日: </strong>
                      {format(new Date(visit.visit_date + "T00:00:00Z"), "yyyy-MM-dd", { locale: ja })}
                    </p>
                    <p>
                      <strong>コメント: </strong>{visit.comment || 'なし'}
                    </p>
                  </div>
                ))
              ) : (
                <p>訪問記録がありません。</p>
              )}
            </div>
          ) : (
            <p>
              <Link href="/sign_in" className="text-blue-600 hover:underline">
                ログイン
              </Link>すると訪問記録がつけられます！
            </p>
          )}
        </CardContent>
      </Card>
    </main>
  );
};

export default ShopDetailPage;
