'use client';

import { CheckCircle, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from 'swr';


import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

type Shop = {
  id: number;
  name: string;
  address: string;
  visited: boolean;
};


export default function ShopListPage() {
  const searchParams = useSearchParams();
  const subArea = searchParams.get("sub_area") || "";
  const area = searchParams.get("area") || "";
  const [shops, setShops] = useState<Shop[]>([]);

  useEffect(() => {
  console.log("Fetched shops data:", shops);
}, [shops]);


  const fetcher = (url: string) => fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "access-token": localStorage.getItem("access-token") || "",
      "client": localStorage.getItem("client") || "",
      "uid": localStorage.getItem("uid") || "",
    },
  }).then(res => {
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  });

  const { data, error } = useSWR(subArea ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/shops/by_sub_area?sub_area=${subArea}` : null, fetcher);

  useEffect(() => {
    if (data) {
      console.log("Fetched shops:", data);
      setShops(data.shops);
    }
  }, [data]);

  if (error) console.error("Error fetching shops:", error);

  return (
    <main className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <Link href={`/area/${encodeURIComponent(area)}`} className="flex items-center text-blue-600 hover:text-blue-800 mb-2">
            <ChevronLeft className="w-4 h-4 mr-1" />
            {area}に戻る
          </Link>
          <CardTitle className="text-2xl font-bold">{subArea} の店舗一覧</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {shops.map((shop) => (
              <li key={shop.id}>
                <Link href={`/shop/${shop.id}?sub_area=${encodeURIComponent(subArea)}&area=${encodeURIComponent(area)}`} className="block p-4 rounded-lg transition-colors duration-200 bg-white hover:bg-gray-100 border border-transparent">
                  <div className="block p-4 rounded-lg transition-colors duration-200 bg-white hover:bg-gray-100 border border-transparent">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{shop.name}</h3>
                      {shop.visited && (
                        <Badge className="flex items-center gap-1 bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3" />
                          訪問済み
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm">{shop.address}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </main>
  );
}
