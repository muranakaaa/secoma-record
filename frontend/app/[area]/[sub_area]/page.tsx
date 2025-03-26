import { fetchShops } from "@/lib/fetchShops";
import { Shop } from "@/types";
import { ChevronLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumb, { BreadcrumbProvider } from "../../components/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import VisitedBadge from "../../components/Visitedbadge";

type Params = { area: string; sub_area: string };

export async function generateMetadata(
  { params }: { params: Promise<Params> },
): Promise<Metadata> {
  const { area, sub_area } = await params;
  const { area: areaName, sub_area: subAreaName } = await fetchShops(area, sub_area);

  return {
    title: `${subAreaName}のセイコーマート店舗一覧【セコマレコード】`,
    description: `【セコマレコード】${subAreaName} ／ ${areaName}のセイコーマート店舗一覧です。訪問済みの店舗を記録できます。セコマ巡りの旅をより楽しく、よりスムーズに進められるよう、あなたの“セコマ制覇”をサポートします。`,
    alternates: { canonical: `https://secoma-record.com/${area}/${sub_area}` },
    openGraph: {
      type: "website",
      url: `https://secoma-record.com/${area}/${sub_area}`,
      title: `${subAreaName}のセイコーマート店舗一覧【セコマレコード】`,
      description: `【セコマレコード】${subAreaName} ／ ${areaName}のセイコーマート店舗を検索し、訪問履歴を管理しましょう！`,
      siteName: "セコマレコード",
      images: [{ url: "/ogp/thumbnail.png", width: 1200, height: 630, alt: "セコマレコードのOGP画像" }],
    },
  };
}

export default async function ShopListPage({ params }: { params: Promise<Params> }) {
  const { area, sub_area } = await params;
  const shopData = await fetchShops(area, sub_area);
  if (!shopData) return notFound();

  const { area: areaName, sub_area: subAreaName, shops } = shopData;

  return (
    <BreadcrumbProvider value={{ area, areaName, subArea: sub_area, subAreaName }}>
      <Breadcrumb />
      <main className="container mx-auto px-4 py-8">
        <Card className="w-full max-w-3xl mx-auto">
          <CardHeader>
            <Link href={`/${area}`} className="flex items-center text-blue-600 hover:text-blue-800 mb-2">
              <ChevronLeft className="w-4 h-4 mr-1" />
              {areaName} に戻る
            </Link>
            <CardTitle className="text-2xl font-bold">{subAreaName} の店舗一覧</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {shops.map(({ id, name, address }: Shop) => (
                <li key={id}>
                  <Link
                    href={`/${area}/${sub_area}/${id}`}
                    className="block p-4 rounded-lg transition-colors duration-200 bg-white hover:bg-gray-100 border border-transparent"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        {name}
                        <VisitedBadge shopId={id} />
                      </h3>
                    </div>
                    <p className="text-gray-600 text-sm">{address}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </main>
    </BreadcrumbProvider>
  );
}
