"use client"
import { getShops } from '@/lib/api';
import { useEffect, useState } from 'react';

type Shop = {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  opening_hours: string;
};

const HomePage = () => {
  const [shops, setShops] = useState<Shop[]>([]);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const data = await getShops();
        setShops(data);
      } catch (error) {
        console.error('Error fetching shops:', error);
      }
    };
    fetchShops();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">セイコーマート店舗一覧</h1>
      <ul className="space-y-4">
        {shops.map((shop) => (
          <li key={shop.id} className="border p-4 rounded-md shadow-sm">
            <h2 className="text-lg font-semibold">{shop.name}</h2>
            <p>住所: {shop.address}</p>
            <p>営業時間: {shop.opening_hours}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
