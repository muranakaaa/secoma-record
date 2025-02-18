import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { fetchShop } from "../../../lib/fetchShop";
import { fetchVisits } from "../../../lib/fetchVisits";
import GoogleMap from "../../components/GoogleMap";
import Visits from "../../components/Visits";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

export default async function ShopDetailPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { sub_area?: string; area?: string };
}) {
  const subArea = searchParams.sub_area || "";
  const area = searchParams.area || "";

  const shop = await fetchShop(params.id);
  const visits = await fetchVisits(params.id);

  if (!shop) {
    return (
      <div className="p-6 text-red-500">
        <h1>店舗情報を取得できませんでした。</h1>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <Link href={`/shop?sub_area=${encodeURIComponent(subArea)}&area=${encodeURIComponent(area)}`}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-2">
            <ChevronLeft className="w-4 h-4 mr-1" />
            {subArea}の店舗一覧に戻る
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
}
