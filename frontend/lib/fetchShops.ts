export const fetchShops = async (area_romaji: string, sub_area_romaji: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/shop/${area_romaji}/${sub_area_romaji}`;

  const res = await fetch(url, { cache: "force-cache" });

  if (!res.ok) {
    throw new Error("店舗情報の取得に失敗しました");
  }

  const data = await res.json();
  return data;
};
