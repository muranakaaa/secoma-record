'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSnackbarState, useUserState } from '../../hooks/useGlobalState';

const SignOut = () => {
  const router = useRouter();
  const [, setUser] = useUserState();
  const [, setSnackbar] = useSnackbarState();

  useEffect(() => {
    localStorage.clear();
    setUser({
      id: 0,
      name: '',
      email: '',
      client: '',
      accessToken: '',
      isSignedIn: false,
      isFetched: true,
    });
    setSnackbar({
      message: 'サインアウトに成功しました',
      severity: 'success',
      pathname: '/',
    })

    router.push('/');
  }, [router, setUser, setSnackbar]);

  return null;
};

export default SignOut;
