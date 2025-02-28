"use client";

import { ChevronLeft, Search } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";
import { Shop } from "../../types";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("query") || "";

  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const fetcher = (url: string) =>
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("検索に失敗しました");
        return res.json();
      });

  const { data, error, isLoading } = useSWR(
    initialQuery ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/shops/search_shops?query=${encodeURIComponent(initialQuery)}` : null,
    fetcher
  );

  const searchResults = data?.shops || [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      return;
    }

    router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800 mb-2">
            <ChevronLeft className="w-4 h-4 mr-1" />
            TOPに戻る
          </Link>
          <CardTitle className="text-2xl font-bold">店舗検索</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-2 mb-6">
            <Input
              type="text"
              placeholder="店舗を検索"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit" disabled={isLoading}>
              <Search className="w-4 h-4 mr-2" />
              {isLoading ? "検索中..." : "検索"}
            </Button>
          </form>

          {error && <p className="text-center text-red-500">{error.message}</p>}

          {searchResults.length > 0 ? (
            <ul className="space-y-4">
              {searchResults.map((shop: Shop) => (
                <li key={shop.id}>
                  <Link href={`/shop/${shop.id}`}>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg">{shop.name}</h3>
                      </div>
                      <p className="text-gray-600 text-sm">{shop.address}</p>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            !isLoading && <p className="text-center text-gray-500">検索結果がありません。</p>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
