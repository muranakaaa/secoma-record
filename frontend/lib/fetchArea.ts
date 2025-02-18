export const fetchArea = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/areas/${id}`, {
    cache: "force-cache",
  });

  if (!res.ok) throw new Error("エリア情報の取得に失敗しました");

  return res.json();
};
