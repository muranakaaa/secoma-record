export const fetchArea = async (id?: string) => {
  if (!id) {
    throw new Error("エリアIDが指定されていません");
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/areas/${id}`, {
    cache: "force-cache",
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("API error:", errorText);
    throw new Error("エリア情報の取得に失敗しました");
  }

  return res.json();
};
