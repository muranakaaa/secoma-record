'use client';

import axios from 'axios';
import { useState } from 'react';

export default function PasswordResetPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handlePasswordReset = async () => {
    try {
      await axios.post('http://localhost:3000/api/v1/users/password', {
        user: { email },
      });
      setMessage('パスワードリセットメールを送信しました。');
      setError('');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(
          'パスワードリセットに失敗しました。メールアドレスを確認してください。',
        );
        setMessage('');
      }
    }
  };

  return (
    <div>
      <h1>パスワードリセット</h1>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="email"
        placeholder="メールアドレス"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handlePasswordReset}>送信</button>
      <p>
        <a href="/login">ログイン画面へ戻る</a>
      </p>
    </div>
  );
}
