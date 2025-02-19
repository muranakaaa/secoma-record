import { fetchShop } from "@/lib/fetchShop";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import GoogleMap from "../../../components/GoogleMap";
import Visits from "../../../components/Visits";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";

export async function generateMetadata({ params }: { params: { area: string; sub_area: string; id: string } }) {
  const shopData = await fetchShop(params.area, params.sub_area, params.id);
  return {
    title: shopData ? `${shopData.name}【セコマレコード】` : "店舗情報",
    description: shopData ? `${shopData.name} の詳細情報【セコマレコード】` : "店舗情報の詳細",
  };
}

export default async function ShopDetailPage({
  params,
}: {
  params: { area: string; sub_area: string; id: string };
}) {
  if (!params.area || !params.sub_area || !params.id) {
    return <div>エリア、サブエリア、または店舗IDが指定されていません。</div>;
  }

const shopData = await fetchShop(params.area, params.sub_area, params.id);

if (!shopData) {
  return <div className="text-center text-gray-500">店舗情報が見つかりません。</div>;
}

return (
  <main className="container mx-auto px-4 py-8">
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <Link
          href={`/${params.area}/${params.sub_area}`}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-2"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          {shopData.sub_area} の店舗一覧に戻る
        </Link>
        <CardTitle className="text-2xl font-bold">{shopData.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">住所</h3>
          <p>{shopData.address}</p>
        </div>

        <GoogleMap latitude={shopData.latitude} longitude={shopData.longitude} shopName={shopData.name} />

        <h3 className="text-lg font-semibold">訪問記録</h3>
        <Visits shopId={shopData.id} initialVisits={[]} />
      </CardContent>
    </Card>
  </main>
);
}
