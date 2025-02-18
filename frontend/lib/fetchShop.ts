export const fetchShop = async (areaRomaji: string, subAreaRomaji: string, shopId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/shop/${areaRomaji}/${subAreaRomaji}/${shopId}`,
    { cache: "force-cache" }
  );

  if (!res.ok) return null;

  return res.json();
};
