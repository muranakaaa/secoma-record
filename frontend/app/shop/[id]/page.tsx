"use client";

import { useParams } from "next/navigation";
import Script from "next/script";
import { useEffect, useState } from "react";

type Shop = {
  id: number;
  name: string;
  address: string;
  latitude: number | null;
  longitude: number | null;
};

const ShopDetailPage = () => {
  const [shop, setShop] = useState<Shop | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchShop = async () => {
      try {
        if (!id) {
          setError("店舗IDが指定されていません。");
          return;
        }

        const apiUrl = `http://localhost:3000/api/v1/shops/${id}`;
        const response = await fetch(apiUrl, {
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("店舗が見つかりませんでした。");
          }
          throw new Error(`データ取得中にエラーが発生しました: ${response.status}`);
        }

        const data = await response.json();
        setShop(data);
      } catch (err) {
        console.error("Error fetching shop details:", err);
        setError(err instanceof Error ? err.message : "不明なエラーが発生しました。");
      }
    };

    fetchShop();
  }, [id]);

  useEffect(() => {
    if (isGoogleMapsLoaded && shop) {
      const latitude = shop.latitude ? parseFloat(shop.latitude.toString()) : null;
      const longitude = shop.longitude ? parseFloat(shop.longitude.toString()) : null;

      if (latitude === null || longitude === null || isNaN(latitude) || isNaN(longitude)) {
        console.error("Invalid coordinates:", { latitude, longitude });
        setError("地図を表示するための座標が無効です。");
        return;
      }

      const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: { lat: latitude, lng: longitude },
        zoom: 15,
      });

      new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map,
        title: shop.name,
      });
    }
  }, [isGoogleMapsLoaded, shop]);

  if (error) {
    return (
      <div className="p-6 text-red-500">
        <h1 className="text-2xl font-bold mb-4">エラー</h1>
        <p>{error}</p>
      </div>
    );
  }

  if (!shop) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`}
        strategy="lazyOnload"
        onLoad={() => {
          console.log("Google Maps API Loaded");
          setIsGoogleMapsLoaded(true);
        }}
        onError={() => {
          console.error("Failed to load Google Maps API");
          setError("Google Maps API の読み込みに失敗しました。");
        }}
      />

      <h1 className="text-2xl font-bold mb-4">店舗詳細</h1>
      <h2 className="text-lg font-semibold mb-2">{shop.name}</h2>
      <p className="mb-1">住所: {shop.address}</p>
      <p className="mb-1">緯度: {shop.latitude !== null ? shop.latitude : "未登録"}</p>
      <p className="mb-1">経度: {shop.longitude !== null ? shop.longitude : "未登録"}</p>

      <div id="map" className="w-6/12 h-96 mt-2" />
    </div>
  );
};

export default ShopDetailPage;
