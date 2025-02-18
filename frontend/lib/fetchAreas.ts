export const fetchAreas = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/areas`);
  if (!res.ok) throw new Error("エリア情報の取得に失敗しました");

  const data = await res.json();
  
  return data.map((area: { id: string; area: string; totalShops: number }) => {
    return {
      id: area.id && area.id.trim() !== "" ? area.id : area.area.replace(/\s+/g, "-").toLowerCase(),
      area: area.area,
      totalShops: area.totalShops,
    };
  });
};
