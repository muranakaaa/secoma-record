import { cookies } from "next/headers";

export const fetchAreasWithToken = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("access-token")?.value || "";
  const client = cookieStore.get("client")?.value || "";
  const uid = cookieStore.get("uid")?.value || "";

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/areas`, {
    headers: {
      "Content-Type": "application/json",
      "access-token": token,
      "client": client,
      "uid": uid,
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("エリア情報の取得に失敗しました");

  return await res.json();
};