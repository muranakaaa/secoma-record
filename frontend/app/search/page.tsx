"use client";

import { CheckCircle, ChevronLeft, Search } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";

type Shop = {
  id: number;
  name: string;
  address: string;
  visited: boolean;
};

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("query") || "";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [searchResults, setSearchResults] = useState<Shop[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialQuery) {
      fetchSearchResults(initialQuery);
    }
  }, [initialQuery]);

  const fetchSearchResults = async (query: string) => {
    setError(null);
    setLoading(true);

    try {
      console.log("APIリクエスト開始: ", query);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/shops/search_shops?query=${encodeURIComponent(query)}`
      );

      if (!response.ok) throw new Error("検索に失敗しました");

      const data = await response.json();
      console.log("APIレスポンス:", data);
      setSearchResults(data.shops);

      if (data.shops.length === 0) {
        setError("検索結果がありません。別のキーワードで試してください。");
      }
    } catch (error) {
      console.error("検索エラー:", error);
      setError("検索中にエラーが発生しました。");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      setError("検索ワードを入力してください。");
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
            <Button type="submit" disabled={loading}>
              <Search className="w-4 h-4 mr-2" />
              {loading ? "検索中..." : "検索"}
            </Button>
          </form>

          {error && <p className="text-center text-red-500">{error}</p>}

          {searchResults.length > 0 && (
            <ul className="space-y-4">
              {searchResults.map((shop) => (
                <li key={shop.id}>
                  <Link href={`/shop/${shop.id}`}>
                    <div
                      className={`p-4 rounded-lg transition-colors duration-200 ${
                        shop.visited
                          ? "bg-green-50 border border-green-200"
                          : "bg-white hover:bg-gray-100 border border-gray-200"
                      }`}
                    >
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
          )}
        </CardContent>
      </Card>
    </main>
  );
}
