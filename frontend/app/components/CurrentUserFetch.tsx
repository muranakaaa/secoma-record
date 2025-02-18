"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { useUserState } from "../hooks/useGlobalState";

const CurrentUserFetch = () => {
  const [user, setUser] = useUserState();
  const [headers, setHeaders] = useState<Record<string, string>>({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHeaders({
        "Content-Type": "application/json",
        "access-token": localStorage.getItem("access-token") || "",
        client: localStorage.getItem("client") || "",
        uid: localStorage.getItem("uid") || "",
      });
    }
  }, []);

  const fetcher = (url: string) =>
    axios.get(url, { headers }).then((res) => res.data);

  const { data, error } = useSWR(
    user.isFetched || !headers["access-token"]
      ? null
      : `${process.env.NEXT_PUBLIC_API_BASE_URL}/current/user`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      setUser({
        ...user,
        ...data,
        isSignedIn: true,
        isFetched: true,
      });
    } else if (error) {
      console.error(error.message);
      setUser({
        ...user,
        isFetched: true,
      });
    } else if (!headers["access-token"]) {
      setUser({
        ...user,
        isFetched: true,
      });
    }
  }, [data, error, user, setUser, headers]);

  return null;
};

export default CurrentUserFetch;
