"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useSnackbarState, useUserState } from "../hooks/useGlobalState";

type SignInFormData = {
  email: string;
  password: string;
};

export default function SignIn() {
  const router = useRouter();
  const [user, setUser] = useUserState()
  const [, setSnackbar] = useSnackbarState()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignInFormData>({
    defaultValues: { email: "", password: "" },
  });

  const validationRules = {
    email: {
      required: "メールアドレスを入力してください。",
      pattern: {
        value:
          /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        message: "正しい形式のメールアドレスを入力してください。",
      },
    },
    password: {
      required: "パスワードを入力してください。",
      minLength: {
        value: 6,
        message: "パスワードは6文字以上で入力してください。",
      },
    },
  };

  const onSubmit: SubmitHandler<SignInFormData> = async (data) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/sign_in`;
      const headers = { "Content-Type": "application/json" };

      const response = await axios.post(url, data, { headers });

      localStorage.setItem("access-token", response.headers["access-token"]);
      localStorage.setItem("client", response.headers["client"]);
      localStorage.setItem("uid", response.headers["uid"]);
      setUser({
        ...user,
        isFetched: false,
      })
      setSnackbar({
        message: 'サインインに成功しました',
        severity: 'success',
        pathname: '/',
      })

      router.push("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setSnackbar({
          message: '登録ユーザーが見つかりません',
          severity: 'error',
          pathname: '/sign_in',
        })
      }
    }
  };

  return (
    <main className="container mx-auto px-4 py-6 md:py-10 flex items-center justify-center min-h-[calc(100vh-8rem)]">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">ログイン</CardTitle>
          <CardDescription>メールアドレスとパスワードを入力してログインしてください</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">メールアドレス</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="secoma-record@example.com"
                  {...register("email", validationRules.email)}
                />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">パスワード</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...register("password", validationRules.password)}
                />
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
              </div>

              <Button type="submit" className="w-full">
                ログイン
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col justify-center gap-2">
          <p className="text-sm text-gray-600">
            アカウントをお持ちでない方は{" "}
            <Link href="/sign_up" className="text-blue-600 hover:underline">
              こちら
            </Link>{" "}
            から新規登録
          </p>
          <p className="text-sm text-gray-600">
            パスワードを忘れた方は{" "}
            <Link href="/password_reset" className="text-blue-600 hover:underline">
              こちら
            </Link>{" "}
            から再設定
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
