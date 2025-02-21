import { fetchArea } from "@/lib/fetchArea";
import { SubArea } from "@/types";
import { CheckCircle, ChevronLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

type Params = { area: string };

export async function generateMetadata(
  { params }: { params: Promise<Params> },
): Promise<Metadata> {
  const { area } = await params;
  const { area: areaName } = await fetchArea(area);

  return {
    title: `${areaName}のセイコーマート店舗一覧【セコマレコード】`,
    description: `【セコマレコード】${areaName} エリアのセイコーマート全店舗コンプリートを目指しませんか？お店ごとの訪問記録も管理できます。セコマ巡りの旅をより楽しく、よりスムーズに進められるよう、あなたの“セコマ制覇”をサポートします。`,
    alternates: { canonical: `https://secoma-record.com/${area}` },
    openGraph: {
      type: "website",
      url: `https://secoma-record.com/${area}`,
      title: `${areaName}のセイコーマート店舗一覧【セコマレコード】`,
      description: `【セコマレコード】${areaName} のセイコーマート店舗を検索し、訪問記録を管理しましょう！`,
      siteName: "セコマレコード",
      images: [{ url: "/ogp/thumbnail.png", width: 1200, height: 630, alt: "セコマレコードのOGP画像" }],
    },
  };
}

export default async function AreaPage({ params }: { params: Promise<Params> }) {
  const { area } = await params;
  const areaData = await fetchArea(area);
  if (!areaData) return notFound();

  const { area: areaName, sub_areas: subAreas } = areaData;

  return (
    <main className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800 mb-2">
            <ChevronLeft className="w-4 h-4 mr-1" />
            TOPに戻る
          </Link>
          <CardTitle className="text-2xl font-bold">{`${areaName} エリア`}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {subAreas.map(({ id, name, visitedShops, totalShops }: SubArea) => (
              <li key={id}>
                <Link href={`/${area}/${id}`} className="flex justify-between items-center p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200">
                  <div className="flex items-center gap-2">
                    <span>{name}</span>
                    {visitedShops === totalShops && (
                      <Badge variant="secondary" className="flex items-center gap-1 bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3" />
                        コンプリート！
                      </Badge>
                    )}
                  </div>
                  <span className="text-gray-600">{visitedShops}/{totalShops}</span>
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </main>
  );
}