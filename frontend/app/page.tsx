"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getShops } from "../lib/api";
import { Button } from "./components/ui/button";
import { Pagination } from "./components/ui/pagination";

type Shop = {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
};

const HomePage = () => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const PER_PAGE = 10;

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const data = await getShops(page, PER_PAGE);
        setShops(data.data);
        setTotalPages(data.meta.total_pages);
      } catch (error) {
        console.error("Error fetching shops:", error);
      }
    };
    fetchShops();
  }, [page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">セイコーマート店舗一覧</h1>
      <ul className="space-y-4">
        {shops.map((shop) => (
          <li key={shop.id} className="border p-4 rounded-md shadow-sm">
            <h2 className="text-lg font-semibold">{shop.name}</h2>
            <p>住所: {shop.address}</p>
            <Link href={`/shop/${shop.id}`} className="text-blue-500 underline">
              <Button>詳細を見る</Button>
            </Link>
          </li>
        ))}
      </ul>

      <Pagination
        total={totalPages}
        current={page}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default HomePage;
