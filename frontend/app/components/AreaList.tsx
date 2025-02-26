import { Area } from "@/types";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { Badge } from "./ui/badge";

const AreaList = ({ areas }: { areas: Area[] }) => {
  if (areas.length === 0) return <p className="text-center text-gray-500">エリア情報がありません</p>;

  const sortedAreas = areas.sort((a: Area, b: Area) => b.totalShops - a.totalShops);

  return (
    <ul className="space-y-2">
      {sortedAreas.map((area: Area, index) => (
        <li key={area.id || `fallback-${index}`}>
          <Link
            href={`/${area.id}`}
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
      ))}
    </ul>
  );
};

export default AreaList;
