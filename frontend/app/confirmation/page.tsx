'use client'

import axios from 'axios'
import type { NextPage } from 'next'
import { useRouter, useSearchParams } from 'next/navigation'
import useSWR from 'swr'
import { useSnackbarState } from '../hooks/useGlobalState'

const Confirmation: NextPage = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [, setSnackbar] = useSnackbarState()

  const confirmationToken = searchParams.get('confirmation_token');

  const fetcher = (url: string, token: string) => axios.patch(url, { confirmation_token: token }).then(res => res.data);

  const { data, error } = useSWR(
    confirmationToken ? [`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/confirmations`, confirmationToken] : null,
    fetcher
  );

  if (!confirmationToken) {
    setSnackbar({
      message: '不正なアクセスです',
      severity: 'error',
      pathname: '/',
    });
    router.push('/');
  }

  if (data) {
    setSnackbar({
      message: '認証に成功しました',
      severity: 'success',
      pathname: '/sign_in',
    });
    router.push('/sign_in');
  }

  if (error) {
    console.log(error.message);
    setSnackbar({
      message: '不正なアクセスです',
      severity: 'error',
      pathname: '/',
    });
    router.push('/');
  }

  return <></>
}

export default Confirmation
