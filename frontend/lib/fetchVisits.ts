export const fetchVisits = async (shopId: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/visits?shop_id=${shopId}`, {
    cache: "no-store",
  });

  if (!res.ok) return [];

  return res.json();
};
