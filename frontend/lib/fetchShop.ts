export const fetchShop = async (areaRomaji: string, subAreaRomaji: string, shopId: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/${areaRomaji}/${subAreaRomaji}/${shopId}`,
    { cache: "force-cache" }
  );

  if (!res.ok) return null;

  return res.json();
};
