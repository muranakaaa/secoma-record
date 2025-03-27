export const fetchAreas = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/areas`, {
    headers: {
      "Content-Type": "application/json",
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
