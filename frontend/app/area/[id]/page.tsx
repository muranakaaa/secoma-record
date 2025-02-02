'use client';

import { CheckCircle, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

type SubArea = {
  id: string;
  name: string;
  totalShops: number;
  visitedShops: number;
};

export default function AreaPage() {
  const params = useParams();
  const [areaName, setAreaName] = useState<string | null>(null);
  const [subAreas, setSubAreas] = useState<SubArea[]>([]);
  const [, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!params || !params.id) return;

    const fetchSubAreas = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/areas/${params.id}`);
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();

        setAreaName(data.area);
        setSubAreas(data.sub_areas);
      } catch (error) {
        console.error("Error fetching sub areas:", error);
        setError(error.message);
      }
    };

    fetchSubAreas();
  }, [params]);

  return (
    <main className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800 mb-2">
            <ChevronLeft className="w-4 h-4 mr-1" />
            TOPに戻る
          </Link>
          <CardTitle className="text-2xl font-bold">{areaName ? `${areaName} エリア` : "Loading..."}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {subAreas.map((subArea) => (
              <li key={subArea.id}>
                <Link
                  href={`/shop?sub_area=${encodeURIComponent(subArea.name)}&area=${encodeURIComponent(areaName || "")}`}
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
