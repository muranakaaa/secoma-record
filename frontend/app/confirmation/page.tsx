'use client'

import axios, { AxiosError } from 'axios'
import type { NextPage } from 'next'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useSnackbarState } from '../hooks/useGlobalState'

const Confirmation: NextPage = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [, setSnackbar] = useSnackbarState()

  useEffect(() => {
    const confirmationToken = searchParams.get('confirmation_token')

    if (!confirmationToken) {
      setSnackbar({
        message: '不正なアクセスです',
        severity: 'error',
        pathname: '/',
      })
      router.push('/')
      return
    }

    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/confirmations`

    axios({ method: 'PATCH', url: url, data: { confirmation_token: confirmationToken } })
      .then(() => {
        setSnackbar({
          message: '認証に成功しました',
          severity: 'success',
          pathname: '/sign_in',
        })
        router.push('/sign_in')
      })
      .catch((e: AxiosError<{ error: string }>) => {
        console.log(e.message)
        setSnackbar({
          message: '不正なアクセスです',
          severity: 'error',
          pathname: '/',
        })
        router.push('/')
      })
  }, [searchParams, router, setSnackbar])

  return <></>
}

export default Confirmation
