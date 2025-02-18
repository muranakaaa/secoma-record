export const fetchShop = async (area_romaji: string, sub_area_romaji: string, id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/shop/${area_romaji}/${sub_area_romaji}/${id}`,
    { cache: "force-cache" }
  );

  if (!res.ok) {
    return null;
  }

  return res.json();
};
