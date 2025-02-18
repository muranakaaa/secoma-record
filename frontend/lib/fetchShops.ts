export const fetchShops = async (areaRomaji: string, subAreaRomaji: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/shop/${areaRomaji}/${subAreaRomaji}`,
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
