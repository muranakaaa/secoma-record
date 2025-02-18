export const fetchSubAreas = async (area: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/areas/${area}`,
    { cache: "force-cache" }
  );

  if (!res.ok) throw new Error("サブエリア情報の取得に失敗しました");

  return res.json();
};
