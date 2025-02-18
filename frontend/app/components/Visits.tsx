"use client";

import { format } from "date-fns";
import { ja } from "date-fns/locale";
import Link from "next/link";
import useSWR from "swr";
import { useUserState } from "../hooks/useGlobalState";

type Visit = {
  id: number;
  shop_id: number;
  user_id: number;
  visit_date: string;
  comment: string | null;
};

const fetcher = (url: string) => fetch(url).then(res => res.ok ? res.json() : []);

const Visits = ({ shopId, initialVisits }: { shopId: number; initialVisits: Visit[] }) => {
  const [user] = useUserState();
  const { data: visits = initialVisits } = useSWR<Visit[]>(
    user.isSignedIn ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/visits?shop_id=${shopId}` : null,
    fetcher,
    { fallbackData: initialVisits }
  );

  return user.isSignedIn ? (
    visits.length > 0 ? (
      visits.map((visit) => (
        <div key={visit.id} className="space-y-2">
          <p>
            <strong>訪問日: </strong>
            {format(new Date(visit.visit_date + "T00:00:00Z"), "yyyy-MM-dd", { locale: ja })}
          </p>
          <p>
            <strong>コメント: </strong>{visit.comment || "なし"}
          </p>
        </div>
      ))
    ) : (
      <p>訪問記録がありません。</p>
    )
  ) : (
    <p>
      <Link href="/sign_in" className="text-blue-600 hover:underline">
        ログイン
      </Link>{" "}
      すると訪問記録がつけられます！
    </p>
  );
};

export default Visits;
