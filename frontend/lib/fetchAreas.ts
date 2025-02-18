export const fetchAreas = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/areas/`, {
    cache: "force-cache",
  });
  if (!res.ok) throw new Error("エリア情報の取得に失敗しました");
  return res.json();
};
