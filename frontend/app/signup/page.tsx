'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    passwordConfirmation: '',
  });
  const router = useRouter();

  const validateEmail = (value: string) => {
    if (!value) return 'メールアドレスを入力してください。';
    if (!/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(value)) return 'メールアドレスの形式が正しくありません。';
    return '';
  };

  const validatePassword = (value: string) => {
    if (!value) return 'パスワードを入力してください。';
    if (value.length < 6) return 'パスワードは6文字以上で入力してください。';
    return '';
  };

  const validatePasswordConfirmation = (value: string) => {
    if (value !== password) return 'パスワードが一致しません。';
    return '';
  };

  const handleBlurEmail = () => {
    setErrors((prev) => ({ ...prev, email: validateEmail(email) }));
  };

  const handleBlurPassword = () => {
    setErrors((prev) => ({ ...prev, password: validatePassword(password) }));
  };

  const handleBlurPasswordConfirmation = () => {
    setErrors((prev) => ({
      ...prev,
      passwordConfirmation: validatePasswordConfirmation(passwordConfirmation),
    }));
  };

  const handleSignup = async () => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const passwordConfirmationError = validatePasswordConfirmation(passwordConfirmation);

    setErrors({
      email: emailError,
      password: passwordError,
      passwordConfirmation: passwordConfirmationError,
    });

    if (emailError || passwordError || passwordConfirmationError) return;

    try {
      await axios.post('http://localhost:3000/api/v1/users', {
        user: { email, password, password_confirmation: passwordConfirmation },
      });
      alert('登録成功');
      router.push('/login');
    } catch (error: any) {
      alert('登録失敗: 入力内容を確認してください。');
    }
  };

  return (
    <div>
      <h1>ユーザー登録</h1>
      <div>
        <label>メールアドレス</label>
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={handleBlurEmail}
        />
        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
      </div>
      <div>
        <label>パスワード</label>
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={handleBlurPassword}
        />
        {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
      </div>
      <div>
        <label>パスワード確認</label>
        <input
          type="password"
          placeholder="パスワード確認"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          onBlur={handleBlurPasswordConfirmation}
        />
        {errors.passwordConfirmation && (
          <p style={{ color: 'red' }}>{errors.passwordConfirmation}</p>
        )}
      </div>
      <button onClick={handleSignup}>登録</button>
      <p>
        すでにアカウントをお持ちの場合は <a href="/login">ログイン</a>
      </p>
    </div>
  );
}
