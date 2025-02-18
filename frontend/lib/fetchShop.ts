export const fetchShop = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/shops/${id}`, {
    cache: "force-cache",
  });

  if (!res.ok) return null;

  return res.json();
};
