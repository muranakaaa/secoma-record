"use client";

export const fetchAreasWithToken = async () => {
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

  return data.map((area: {
    id: string;
    area: string;
    totalShops: number;
    visitedShops?: number;
  }) => ({
    id: area.id,
    area: area.area,
    totalShops: area.totalShops,
    visitedShops: area.visitedShops ?? 0,
  }));
};
