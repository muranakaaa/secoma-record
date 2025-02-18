export const fetchShops = async (area_romaji: string, sub_area_romaji: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/areas/${area_romaji}/sub_areas/${sub_area_romaji}/shops`,
    { cache: "force-cache" }
  );

  if (!res.ok) throw new Error("店舗情報の取得に失敗しました");

  return res.json();
};
