"use client";

import { fetchSubAreasWithToken } from "@/lib/fetchSubAreasWithToken";
import { SubArea } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const SubAreaList = () => {
  const pathname = usePathname();
  const areaId = pathname.split("/")[1];

  const [subAreas, setSubAreas] = useState<SubArea[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchSubAreasWithToken(areaId);
        setSubAreas(data.sub_areas);
        setAreaName(data.area);
      } catch (err) {
        console.error(err);
        setError(true);
      }
    };
    if (areaId) {
      load();
    }
  }, [areaId]);

  if (error) return <p className="text-center text-red-500">サブエリアの取得に失敗しました</p>;
  if (!subAreas) return <p className="text-center text-gray-500">読み込み中...</p>;

  const sortedSubAreas = subAreas.sort((a, b) => b.totalShops - a.totalShops);

  return (
    <ul className="space-y-2">
      {sortedSubAreas.map((subArea, index) => (
        <li key={subArea.id || `fallback-${index}`}>
          <Link
            href={`/${areaId}/${subArea.id}`}
            className="flex justify-between items-center p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
          >
            <div className="flex items-center gap-2">
              <span>{subArea.name}</span>
            </div>
            <span className="text-gray-600 text-sm">
              {subArea.visitedShops ?? 0} / {subArea.totalShops}件
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SubAreaList;