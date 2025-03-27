"use client";

import { Area } from "@/types";
import Link from "next/link";

type Props = {
  areas: Area[];
};

const AreaList = ({ areas }: Props) => {
  const sortedAreas = areas.sort((a, b) => b.totalShops - a.totalShops);

  return (
    <ul className="space-y-2">
      {sortedAreas.map((area, index) => (
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
