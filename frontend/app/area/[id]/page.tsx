import { CheckCircle, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { fetchArea } from "../../../lib/fetchArea";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

type SubArea = {
  id: string;
  name: string;
  totalShops: number;
  visitedShops: number;
};

export default async function AreaPage({ params }: { params: { id: string } }) {
  const areaData = await fetchArea(params.id);

  return (
    <main className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800 mb-2">
            <ChevronLeft className="w-4 h-4 mr-1" />
            TOPに戻る
          </Link>
          <CardTitle className="text-2xl font-bold">{areaData ? `${areaData.area} エリア` : "エリア情報なし"}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {areaData.sub_areas.map((subArea: SubArea) => (
              <li key={subArea.id}>
                <Link
                  href={`/shop?sub_area=${encodeURIComponent(subArea.name)}&area=${encodeURIComponent(areaData.area)}`}
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
}
