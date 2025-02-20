import { fetchShop } from "@/lib/fetchShop";
import { ChevronLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import GoogleMap from "../../../components/GoogleMap";
import Visits from "../../../components/Visits";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";

type Params = { area: string; sub_area: string; id: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { area, sub_area, id } = await params;
  const shopData = await fetchShop(area, sub_area, id);
  if (!shopData) return { title: "店舗情報が見つかりません【セコマレコード】" };

  return {
    title: `${shopData.name}の店舗情報【セコマレコード】`,
    description: `${shopData.name}の詳細情報です。住所: ${shopData.address}。訪問記録を管理できます。`,
    alternates: { canonical: `https://secoma-record.com/${area}/${sub_area}/${id}` },
    openGraph: {
      type: "website",
      url: `https://secoma-record.com/${area}/${sub_area}/${id}`,
      title: `${shopData.name}の店舗情報【セコマレコード】`,
      description: `${shopData.name}の店舗情報です。住所は${shopData.address}。訪問履歴を記録しましょう！`,
      siteName: "セコマレコード",
      images: [{ url: "/ogp/thumbnail.png", width: 1200, height: 630, alt: "セコマレコードのOGP画像" }],
    },
  };
}

export default async function ShopDetailPage({ params }: { params: Promise<Params> }) {
  const { area, sub_area, id } = await params;
  const shopData = await fetchShop(area, sub_area, id);
  if (!shopData) return notFound();

  return (
    <main className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <Link href={`/${area}/${sub_area}`} className="flex items-center text-blue-600 hover:text-blue-800 mb-2">
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