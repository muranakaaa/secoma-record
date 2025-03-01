"use client";

import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { createContext, useContext } from "react";
import BreadcrumbJsonLD from "./BreadcrumbJsonLD";

// パンくずリストのデータを管理するコンテキストを作成
// area: URL用のエリアスラグ（例: "ishikari-sorachi-chitose"）
// areaName: 表示用のエリア名（例: "石狩・空知・千歳 エリア"）
// subArea: URL用のサブエリアスラグ（例: "ebetsu"）
// subAreaName: 表示用のサブエリア名（例: "江別市"）
// shopName: 表示用の店舗名（例: "セイコーマート江別店"）
const BreadcrumbContext = createContext<{ area?: string; areaName?: string; subArea?: string; subAreaName?: string; shopName?: string }>({});

// パンくずリストのデータを `BreadcrumbContext` に提供する Provider コンポーネント
export const BreadcrumbProvider = ({ children, value }: { children: React.ReactNode; value: any }) => (
  <BreadcrumbContext.Provider value={value}>{children}</BreadcrumbContext.Provider>
);

const Breadcrumb = ({ className = "", homeLabel = "TOP" }: { className?: string; homeLabel?: string }) => {
  const { area, areaName, subArea, subAreaName, shopName } = useContext(BreadcrumbContext);

  const breadcrumbItems = [];
  if (area && areaName) breadcrumbItems.push({ label: `${areaName} エリア`, url: `/${area}` });
  if (subArea && subAreaName) breadcrumbItems.push({ label: `${subAreaName} の店舗一覧`, url: `/${area}/${subArea}` });
  if (shopName) breadcrumbItems.push({ label: shopName, url: `/${area}/${subArea}/${shopName}` });

  return (
    <>
      <nav aria-label="パンくずリスト" className={`bg-gray-100 py-2 text-sm ${className}`}>
        <div className="container mx-auto px-4">
          <ol className="flex flex-wrap items-center">
            <li className="flex items-center">
              <Link href="/" className="text-gray-600 hover:text-gray-900 flex items-center">
                <Home size={14} className="mr-1" />
                <span>{homeLabel}</span>
              </Link>
            </li>

            {breadcrumbItems.map((item, index) => (
              <li key={item.url} className="flex items-center">
                <ChevronRight size={14} className="mx-2 text-gray-400" aria-hidden="true" />
                {index === breadcrumbItems.length - 1 ? (
                  <span className="text-gray-900 font-medium" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <Link href={item.url} className="text-gray-600 hover:text-gray-900">
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
      <BreadcrumbJsonLD breadCrumbs={breadcrumbItems} />
    </>
  );
};

export default Breadcrumb;
