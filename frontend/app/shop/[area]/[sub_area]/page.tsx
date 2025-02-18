import { fetchShops } from "@/lib/fetchShops";
import { Shop } from "@/types";
import { CheckCircle, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Badge } from "../../../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";

export async function generateMetadata({ params }: { params: { area: string; sub_area: string } }) {
  const shopData = await fetchShops(params.area, params.sub_area);
  return {
    title: shopData ? `${shopData.sub_area}のセイコーマート店舗一覧【セコマレコード】` : "店舗情報",
    description: shopData ? `【セコマレコード】の${shopData.sub_area}地域のページです` : "店舗情報の詳細",
  };
}


export default async function ShopListPage({
  params,
}: {
  params: { area: string; sub_area: string };
}) {
  if (!params.area || !params.sub_area) {
    return <div>エリアまたはサブエリアが指定されていません。</div>;
  }

const shopData = await fetchShops(params.area, params.sub_area);

if (!shopData) {
  return <div className="text-center text-gray-500">店舗情報が見つかりません。</div>;
}

return (
  <main className="container mx-auto px-4 py-8">
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <Link
          href={`/area/${params.area}`}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-2"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          {shopData.area} に戻る
        </Link>
        <CardTitle className="text-2xl font-bold">{shopData.sub_area} の店舗一覧</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {shopData.shops.map((shop: Shop) => (
            <li key={shop.id}>
              <Link
                href={`/shop/${params.area}/${params.sub_area}/${shop.id}`}
                className="block p-4 rounded-lg transition-colors duration-200 bg-white hover:bg-gray-100 border border-transparent"
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
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  </main>
)};