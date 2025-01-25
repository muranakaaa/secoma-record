'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useUserState } from '../hooks/useGlobalState';

const SignOut = () => {
  const router = useRouter();
  const [, setUser] = useUserState();

  useEffect(() => {
    localStorage.clear();
    setUser({
      id: 0,
      name: '',
      email: '',
      isSignedIn: false,
      isFetched: true,
    });

    router.push('/');
  }, [router, setUser]);

  return null;
};

export default SignOut;
