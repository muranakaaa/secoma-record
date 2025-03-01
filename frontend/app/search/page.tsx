import { fetchSearchShops } from "@/lib/fetchShops";
import { Shop } from "@/types";
import { ChevronLeft, Search } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";

type Params = Promise<{ [key: string]: string }>;

type Props = {
  params: Params;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.query ? String(resolvedSearchParams.query) : "";
  const shopData = await fetchSearchShops(query);

  if (!shopData || shopData.shops.length === 0) return notFound();

  return {
    title: `${query} の検索結果【セコマレコード】`,
    description: `【セコマレコード】「${query}」の検索結果一覧です。訪問済みの店舗を記録できます。あなたの“セコマ制覇”をサポートします。`,
    alternates: { canonical: `https://secoma-record.com/search?query=${encodeURIComponent(query)}` },
    openGraph: {
      type: "website",
      url: `https://secoma-record.com/search?query=${encodeURIComponent(query)}`,
      title: `${query} の検索結果【セコマレコード】`,
      description: `【セコマレコード】「${query}」のセイコーマート店舗を検索し、訪問履歴を管理しましょう！`,
      siteName: "セコマレコード",
      images: [{ url: "/ogp/thumbnail.png", width: 1200, height: 630, alt: "セコマレコードのOGP画像" }],
    },
  };
}

export default async function SearchResultsPage({ params, searchParams }: Props) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const area = resolvedParams.area ?? "";
  const query = resolvedSearchParams.query ? String(resolvedSearchParams.query) : "";
  const shopData = await fetchSearchShops(query);
  if (!shopData) return notFound();

  const { shops } = shopData;

  return (
    <main className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800 mb-2">
            <ChevronLeft className="w-4 h-4 mr-1" />
            TOPに戻る
          </Link>
          <CardTitle className="text-2xl font-bold">{area ? `${area} の` : ""} 店舗検索</CardTitle>
        </CardHeader>
        <CardContent>
          <form action="/search" method="GET" className="flex gap-2 mb-6">
            <Input type="text" name="query" placeholder="店舗を検索" defaultValue={query} className="flex-grow" />
            <Button type="submit">
              <Search className="w-4 h-4 mr-2" />
              検索
            </Button>
          </form>
          {shops.length > 0 ? (
            <ul className="space-y-4">
              {shops.map(({ id, name, address, area_romaji, sub_area_romaji }: Shop) => (
                <li key={id}>
                  <Link href={`/${area_romaji}/${sub_area_romaji}/${id}`} className="block p-4 rounded-lg transition-colors duration-200 bg-white hover:bg-gray-100 border border-transparent">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{name}</h3>
                    </div>
                    <p className="text-gray-600 text-sm">{address}</p>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500">検索結果がありません。</p>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
