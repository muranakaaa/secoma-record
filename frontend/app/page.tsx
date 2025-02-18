'use client';

import { CheckCircle, Info } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useSWR from 'swr';
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Input } from "./components/ui/input";

type Area = {
  id: string;
  area: string;
  visitedShops: number;
  totalShops: number;
};

const HomePage = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
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
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  });

  const { data: fetchedAreas = [] } = useSWR<Area[]>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/areas/`, fetcher);

  return (
    <main className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">セコマレコード</CardTitle>
          <p className="text-center text-sm md:text-lg leading-tight text-nowrap">セコマ巡りの旅を、より楽しく、よりスムーズに。</p>
        </CardHeader>
        <CardContent>
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h2 className="text-lg font-semibold mb-2 flex items-center">
              <Info className="w-5 h-5 mr-2 text-blue-500" />
              セコマレコードとは？
            </h2>
            <p className="text-sm text-gray-700">
              セイコーマート全店制覇を目指す人のための訪問記録管理アプリです。エリアごとの店舗検索や訪問記録の管理ができるため、効率的に訪問計画を立てられます。セコマ巡りの旅をより楽しく、よりスムーズに進められるよう、あなたの“セコマ制覇”をサポートします。
              <span className="block mt-2 text-xs text-gray-500">セイコーマート非公式</span>
            </p>
          </div>
          <div className="mb-6">
            <form className="flex gap-2" onSubmit={handleSearch}>
              <Input
                type="text"
                placeholder="店舗名で検索"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow"
              />
              <Button type="submit">検索</Button>
            </form>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">エリアで選ぶ</h2>
            <ul className="space-y-2">
              {fetchedAreas.length > 0 ? (
                fetchedAreas.map((area: Area, index) => {
                  const areaSlug = area.area.replace(/\s+/g, "-").toLowerCase();
                  return (
                    <li key={area.id || `fallback-${index}`}>
                      <Link
                        href={`/area/${areaSlug}`}
                        className="flex justify-between items-center p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-sm sm:text-base">{area.area}</span>
                          {area.visitedShops === area.totalShops && (
                            <Badge variant="secondary" className="flex items-center gap-1 bg-green-100 text-green-800">
                              <CheckCircle className="w-3 h-3" />
                              コンプリート！
                            </Badge>
                          )}
                        </div>
                        <span className="text-gray-600 text-sm">
                          {area.visitedShops}/{area.totalShops}
                        </span>
                      </Link>
                    </li>
                  );
                })
              ) : (
                <p className="text-center text-gray-500">エリア情報がありません</p>
              )}
            </ul>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default HomePage;
