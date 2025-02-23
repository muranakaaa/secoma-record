"use client";

import { cn } from "@/lib/utils";
import { Visit } from "@/types";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { CalendarIcon, PenIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";
import { Button } from "../components/ui/button";
import { Calendar } from "../components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { Textarea } from "../components/ui/textarea";
import { useUserState } from "../hooks/useGlobalState";

const fetcher = (url: string) => fetch(url).then(res => res.ok ? res.json() : []);

const Visits = ({ shopId, initialVisits }: { shopId: number; initialVisits: Visit[] }) => {
  const [user] = useUserState();
  const { data: visits = initialVisits } = useSWR<Visit[]>(
    user.isSignedIn ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/visits?shop_id=${shopId}` : null,
    fetcher,
    { fallbackData: initialVisits }
  );

  const [date, setDate] = useState<Date | null>(null);
  const [comment, setComment] = useState<string>("");
  const [isEditing, setIsEditing] = useState<number | null>(null);

  const handleDelete = async (visitId: number) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/visits/${visitId}`, {
        method: "DELETE",
        headers: {
        'Content-Type': 'application/json',
        'access-token': localStorage.getItem('access-token') || '',
        'client': localStorage.getItem('client') || '',
        'uid': localStorage.getItem('uid') || '',
      },
      });
    } catch (error) {
      console.error("Error deleting visit:", error);
    }
  };

  const handleCreateOrUpdate = async () => {
    const method = isEditing ? "PUT" : "POST";
    const endpoint = isEditing
      ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/visits/${isEditing}`
      : `${process.env.NEXT_PUBLIC_API_BASE_URL}/visits`;

    try {
      await fetch(endpoint, {
        method,
        headers: {
        'Content-Type': 'application/json',
        'access-token': localStorage.getItem('access-token') || '',
        'client': localStorage.getItem('client') || '',
        'uid': localStorage.getItem('uid') || '',
      },
        body: JSON.stringify({
          visit: {
            shop_id: shopId,
            visit_date: date ? format(date, "yyyy-MM-dd") : null,
            comment,
          }
        }),
      });

      setDate(null);
      setComment("");
      setIsEditing(null);
    } catch (error) {
      console.error("Error saving visit:", error);
    }
  };

  return user.isSignedIn ? (
    <div className="space-y-4">
      {visits.length > 0 ? (
        visits.map((visit) => (
          <div key={visit.id} className="space-y-2 border-b pb-4">
            <p>
              <strong>訪問日: </strong>
              {format(new Date(visit.visit_date + "T00:00:00Z"), "yyyy-MM-dd", { locale: ja })}
            </p>
            <p>
              <strong>コメント: </strong>{visit.comment || "なし"}
            </p>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setDate(new Date(visit.visit_date));
                  setComment(visit.comment || "");
                  setIsEditing(visit.id);
                }}
              >
                <PenIcon className="w-4 h-4 mr-2" /> 編集
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleDelete(visit.id)}>
                <TrashIcon className="w-4 h-4 mr-2" /> 削除
              </Button>
            </div>
          </div>
        ))
      ) : (
        <p>訪問記録がありません。</p>
      )}
      {user.isSignedIn && (isEditing !== null || visits.length === 0) && (
        <div className="flex flex-col space-y-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "yyyy-MM-dd", { locale: ja }) : "日付を選択"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date || undefined}
                onSelect={(selectedDate) => {
                  if (selectedDate) {
                    const localDate = new Date(
                      Date.UTC(
                        selectedDate.getFullYear(),
                        selectedDate.getMonth(),
                        selectedDate.getDate()
                      )
                    );
                    setDate(localDate);
                  }
                }}
                locale={ja}
              />
            </PopoverContent>
          </Popover>
          <Textarea
            placeholder="訪問の感想や記録を入力してください（任意）"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="block mb-2"
          />
          <Button onClick={handleCreateOrUpdate}>
            {isEditing ? "更新" : "作成"}
          </Button>
        </div>
      )}
    </div>
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
