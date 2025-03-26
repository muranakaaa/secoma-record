"use client";

import { CheckCircle } from "lucide-react";
import useSWR from "swr";
import { useUserState } from "../hooks/useGlobalState";
import { Badge } from "./ui/badge";

type Props = {
  shopId: number;
};

const fetcher = (url: string) => fetch(url).then(res => res.ok ? res.json() : []);

const VisitedBadge = ({ shopId }: Props) => {
  const [user] = useUserState();

  const visitsKey = user.isSignedIn
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/visits?shop_id=${shopId}`
    : null;

  const { data: visits } = useSWR(visitsKey, fetcher);

  if (!user.isSignedIn || !visits || visits.length === 0) {
    return null;
  }

  return (
    <Badge className="bg-green-100 text-green-800 flex items-center gap-1 hover:bg-green-200">
      <CheckCircle className="w-3 h-3" />
      訪問済み！
    </Badge>
  );
};

export default VisitedBadge;
