'use client'

import axios from 'axios'
import type { NextPage } from 'next'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { useSnackbarState } from '../hooks/useGlobalState'

const Confirmation: NextPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [, setSnackbar] = useSnackbarState();
  const [confirmationToken, setConfirmationToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setConfirmationToken(searchParams.get('confirmation_token'));
    }
  }, [searchParams]);

  const fetcher = async (url: string, token: string) => {
    if (!token) return null;
    const res = await axios.patch(url, { confirmation_token: token });
    return res.data;
  };

  const { data, error } = useSWR(
    confirmationToken ? [`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/confirmations`, confirmationToken] : null,
    ([url, token]) => fetcher(url, token),
    { revalidateOnFocus: false }
  );

  useEffect(() => {
    if (!confirmationToken) return;

    if (data) {
      setSnackbar({
        message: '認証に成功しました',
        severity: 'success',
        pathname: '/sign_in',
      });
      router.push('/sign_in');
    }

    if (error) {
      console.error(error.message);
      setSnackbar({
        message: '認証に失敗しました',
        severity: 'error',
        pathname: '/',
      });
      router.push('/');
    }
  }, [confirmationToken, data, error, router, setSnackbar]);

  return null;
};

export default Confirmation;
