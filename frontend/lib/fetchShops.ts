export const fetchShops = async (areaRomaji: string, subAreaRomaji: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/${areaRomaji}/${subAreaRomaji}`,
    { cache: "force-cache" }
  );

  if (!res.ok) throw new Error("店舗情報の取得に失敗しました");

  const data = await res.json();

  return {
    area: data.area,
    sub_area: data.sub_area,
    shops: data.shops,
  };
};

export const fetchSearchShops = async (query: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/shops/search_shops?query=${encodeURIComponent(query)}`,
    { cache: "no-store" }
  );

  if (!res.ok) throw new Error("店舗検索に失敗しました");

  return res.json();
};
