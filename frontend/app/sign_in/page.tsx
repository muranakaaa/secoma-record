"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
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
    <Card className="mx-auto max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>Enter your email and password to login to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email", validationRules.email)}
              />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register("password", validationRules.password)}
              />
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>

            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
