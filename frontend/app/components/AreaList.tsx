"use client";

import { Area } from "@/types";
import Link from "next/link";
import useSWR from "swr";

const fetchAreasWithToken = async () => {
  const token = localStorage.getItem("access-token") || "";
  const client = localStorage.getItem("client") || "";
  const uid = localStorage.getItem("uid") || "";

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/areas`, {
    headers: {
      "Content-Type": "application/json",
      "access-token": token,
      "client": client,
      "uid": uid,
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("エリア情報の取得に失敗しました");

  const data = await res.json();
  return data;
};

const AreaList = () => {
  const { data: areas, error } = useSWR("/areas", fetchAreasWithToken);

  if (error) return <p className="text-center text-red-500">エリア情報の取得に失敗しました</p>;
  if (!areas) return <p className="text-center text-gray-500">読み込み中...</p>;

  const sortedAreas = areas.sort((a: Area, b: Area) => b.totalShops - a.totalShops);

  return (
    <ul className="space-y-2">
      {sortedAreas.map((area: Area, index: number) => (
        <li key={area.id || `fallback-${index}`}>
          <Link
            href={`/${area.id}`}
            className="flex justify-between items-center p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm sm:text-base">{area.area}</span>
            </div>
            <span className="text-gray-600 text-sm">
              {area.visitedShops ?? 0} / {area.totalShops}件
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default AreaList;
