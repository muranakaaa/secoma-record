'use client';

import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Input } from "./components/ui/input";

type Area = {
  id: string;
  area: string;
  visitedShops: number;
  totalShops: number;
};

const HomePage = () => {
  const [areas, setAreas] = useState<Area[]>([]);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/areas/`);
        if (!response.ok) throw new Error("Failed to fetch");
        const data: Area[] = await response.json();
        setAreas(data);
      } catch (error) {
        console.error("Error fetching areas:", error);
      }
    };

    fetchAreas();
  }, []);

  useEffect(() => {
  console.log(`
 ::::::::::::::::::::::::::::::::........::::::::::
 @@@@@@@@@@@@@@@@@@@@@@@@@@@@%#*+===--=+#@@@@@@@@@@
 @@@@@@@@@@@@@@@@@@@@@@@@@@#+=--====-+%@@@@@@@@@@@@
 @@@@@@@@@@@@@@@@@@@@@@@@*=--======-+@@@@@@@@@@@@@@
 @@@@@@@@@@@@@@@@@@@@@@%+-==========%@@@@@@@@@@@@@@
 #**##%%@@@@@@@@@@@@@@%=-===========@@@@@@@@@@@@@@@
 %+-*=-==+%@@@@@@@@@@@=-============%@@@@@@@@@@@@@@
 @@*-==-=@@@@@@@@@@@@#-============-#@@@@@@@@@@@@@@
 @@#-===%@@@@@@@@@@@@+-============-+@@@@@@@@@@@@@@
 @@*-===@@@@@@@@@@@@%==============-+@@@@@@@#*++++#
 @@+-===%@@@@@@@@@@@*-=============-+@@@@%+=---+#@@
 @@====-+@@@@@@@@@@%================%@@@#=-==-*@@@@
 @%=====-+%@@@@@@@#===============-*@@@*-=====@@@@@
 @%-=====-=+*###*=-=============-=#@@@#-====-+@@@@@
 @%========------===========--==*@@@@*======-*@@@@@
 @@=========================*#%@@@%*=-=======@@@@@@
 @@*-=======================+++++==-======-=#@@@@@@
 @@@=-======================-----========-=%@@@@@@@
 @@@%=-======================-=======---=*@@@@@@@@@
 @@@@%=-=====================++======+*%@@@@@@@@@@@
 @@@@@@*=--==================*%@@@@@@@@@@@@%##@@@@@
 @@@@@@@@#+=--===============-==++*****++=++#@@@@@@
 @@@@@@@@@@%#+===--=============-----==+*%@@@@@@@@@
 @@@@@@@@@@@@@@%#**+=====---=====+**#%@@@@@@@@@@@@@
 ::::::::::::::::::::...........:::::::::::::::::::
  `);
}, []);

  return (
    <main className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">セコマレコード</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <form className="flex gap-2">
              <Input type="text" placeholder="店舗を検索" className="flex-grow" />
              <Button type="submit">検索</Button>
            </form>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">エリアで選ぶ</h2>
            <ul className="space-y-2">
            {areas.length > 0 ? (
              areas.map((area, index) => {
                const areaSlug = area.area.replace(/\s+/g, "-").toLowerCase();
                return (
                  <li key={area.id || `fallback-${index}`}>
                    <Link
                      href={`/area/${areaSlug}`}
                      className="flex justify-between items-center p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm sm:text-base">{area.area}</span>
                        {area.visitedShops === area.totalShops && (
                          <Badge variant="secondary" className="flex items-center gap-1 bg-green-100 text-green-800">
                            <CheckCircle className="w-3 h-3" />
                            コンプリート！
                          </Badge>
                        )}
                      </div>
                      <span className="text-gray-600 text-sm">
                        {area.visitedShops}/{area.totalShops}
                      </span>
                    </Link>
                  </li>
                );
              })
            ) : (
              <p className="text-center text-gray-500">エリア情報がありません</p>
            )}
          </ul>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default HomePage;
