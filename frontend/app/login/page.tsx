'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await axios.post('http://localhost:3000/api/v1/users/sign_in', {
        user: { email, password },
      });
      alert('ログイン成功');
      router.push('/');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(
          'ログイン失敗: メールアドレスまたはパスワードが正しくありません。',
        );
      }
    }
  };

  return (
    <div>
      <h1>ログイン</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="email"
        placeholder="メールアドレス"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="パスワード"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>ログイン</button>
      <p>
        アカウントをお持ちでない場合は <a href="/signup">登録</a>
      </p>
    </div>
  );
}
