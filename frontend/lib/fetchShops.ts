export const fetchShops = async (subArea: string) => {
  if (!subArea) return { shops: [] };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/shops/by_sub_area?sub_area=${encodeURIComponent(subArea)}`,
    {
      cache: "force-cache",
    }
  );

  if (!res.ok) throw new Error("店舗情報の取得に失敗しました");

  return res.json();
};
