import { fetchArea } from "@/lib/fetchArea";
import { SubArea } from "@/types";
import { CheckCircle, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

export async function generateMetadata({ params }: { params: { area: string; sub_area?: string } }) {
  const areaData = await fetchArea(params.area);

  return {
    title: `${areaData.area}のセイコーマート店舗一覧【セコマレコード】`,
    description: `【セコマレコード】${areaData.area} エリアのセイコーマート全店舗コンプリートを目指しませんか？ セコマレコードでは店舗検索や訪問記録の管理ができるため、効率的に訪問計画を立てられます。セコマ巡りの旅をより楽しく、よりスムーズに進められるよう、あなたの“セコマ制覇”をサポートします。`,
    alternates: {
      canonical: `https://secoma-record.com/${params.area}/${params.sub_area || ""}`,
    },
  };
}

export default async function AreaPage({ params }: { params?: { area?: string } }) {
  if (!params || !params.area) {
    console.error("Error: Area param is undefined.");
    return <div>エリアが指定されていません</div>;
  }

  try {
    const areaData = await fetchArea(params.area);

    if (!areaData) {
      return <div>エリア情報が見つかりません</div>;
    }

    return (
      <main className="container mx-auto px-4 py-8">
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800 mb-2">
              <ChevronLeft className="w-4 h-4 mr-1" />
              TOPに戻る
            </Link>
            <CardTitle className="text-2xl font-bold">{`${areaData.area} エリア`}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {areaData.sub_areas.map((subArea: SubArea) => (
                <li key={subArea.id}>
                  <Link
                    href={`/${params.area}/${subArea.id}`}
                    className="flex justify-between items-center p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                  >
                    <div className="flex items-center gap-2">
                      <span>{subArea.name}</span>
                      {subArea.visitedShops === subArea.totalShops && (
                        <Badge variant="secondary" className="flex items-center gap-1 bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3" />
                          コンプリート！
                        </Badge>
                      )}
                    </div>
                    <span className="text-gray-600">
                      {subArea.visitedShops}/{subArea.totalShops}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </main>
    );
  } catch (error) {
    console.error("Error fetching area data:", error);
    return <div>エリア情報の取得に失敗しました</div>;
  }
}
