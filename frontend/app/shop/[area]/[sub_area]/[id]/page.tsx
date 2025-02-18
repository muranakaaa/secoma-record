import { fetchArea } from "@/lib/fetchArea";
import { fetchShop } from "@/lib/fetchShop";
import { fetchVisits } from "@/lib/fetchVisits";
import { SubArea } from "@/types";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import GoogleMap from "../../../../components/GoogleMap";
import Visits from "../../../../components/Visits";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";

export default async function ShopDetailPage({
  params,
}: {
  params: { area: string; sub_area: string; id: string };
}) {
  if (!params.area || !params.sub_area || !params.id) {
    return <div>エリア、サブエリア、または店舗IDが指定されていません。</div>;
  }

  const areaRomaji = decodeURIComponent(params.area);
  const subAreaRomaji = decodeURIComponent(params.sub_area);
  const shopId = decodeURIComponent(params.id);

  console.log("📡 Received params:", areaRomaji, subAreaRomaji, shopId);

  try {
    const areaData = await fetchArea(areaRomaji);
    if (!areaData) {
      return <div className="text-center text-gray-500">エリア情報が見つかりません。</div>;
    }

    const subAreaData = areaData.sub_areas.find((sub: SubArea) => sub.id === subAreaRomaji);
    if (!subAreaData) {
      return <div className="text-center text-gray-500">サブエリア情報が見つかりません。</div>;
    }

    const shop = await fetchShop(areaRomaji, subAreaRomaji, shopId);
    if (!shop) {
      return (
        <div className="p-6 text-red-500">
          <h1>店舗情報を取得できませんでした。</h1>
        </div>
      );
    }

    const visits = await fetchVisits(shopId);

    return (
      <main className="container mx-auto px-4 py-8">
        <Card className="w-full max-w-3xl mx-auto">
          <CardHeader>
            <Link
              href={`/shop/${params.area}/${params.sub_area}`}
              className="flex items-center text-blue-600 hover:text-blue-800 mb-2"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              {subAreaData.name} の店舗一覧に戻る
            </Link>
            <CardTitle className="text-2xl font-bold">{shop.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">住所</h3>
              <p>{shop.address}</p>
            </div>

            <GoogleMap latitude={shop.latitude} longitude={shop.longitude} shopName={shop.name} />

            <h3 className="text-lg font-semibold">訪問記録</h3>
            <Visits shopId={shop.id} initialVisits={visits} />
          </CardContent>
        </Card>
      </main>
    );
  } catch (error) {
    return <div className="text-center text-gray-500">店舗情報の取得に失敗しました。</div>;
  }
}
