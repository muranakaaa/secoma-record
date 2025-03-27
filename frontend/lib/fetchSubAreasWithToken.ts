"use client";

export const fetchSubAreasWithToken = async (areaId: string) => {
  const token = localStorage.getItem("access-token") || "";
  const client = localStorage.getItem("client") || "";
  const uid = localStorage.getItem("uid") || "";

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/areas/${areaId}`, {
    headers: {
      "Content-Type": "application/json",
      "access-token": token,
      "client": client,
      "uid": uid,
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("サブエリア情報の取得に失敗しました");

  return await res.json();
};
