"use client";

import { useParams } from "next/navigation";
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
  const { id } = useParams();

  console.log("useParams result:", id); // `id` の値を確認

  useEffect(() => {
    const fetchShop = async () => {
      try {
        if (!id) {
          setError("店舗IDが指定されていません。");
          return;
        }

        const apiUrl = `http://localhost:3000/api/v1/shops/${id}`;
        console.log(`Fetching shop details with ID: ${id}`);

        const response = await fetch(apiUrl, {
          headers: {
            Accept: "application/json",
          },
        });

        console.log("Response object:", response);

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("店舗が見つかりませんでした。");
          }
          throw new Error(`データ取得中にエラーが発生しました: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched data:", data);
        setShop(data);
      } catch (err) {
        console.error("Error fetching shop details:", err);
        setError(err instanceof Error ? err.message : "不明なエラーが発生しました。");
      }
    };

    fetchShop();
  }, [id]);

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
      <h1 className="text-2xl font-bold mb-4">店舗詳細</h1>
      <h2 className="text-lg font-semibold mb-2">{shop.name}</h2>
      <p className="mb-1">住所: {shop.address}</p>
      <p className="mb-1">緯度: {shop.latitude !== null ? shop.latitude : "未登録"}</p>
      <p className="mb-1">経度: {shop.longitude !== null ? shop.longitude : "未登録"}</p>
    </div>
  );
};

export default ShopDetailPage;
