"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useSnackbarState } from "../hooks/useGlobalState";

type SignUpFormData = {
  email: string;
  password: string;
  name: string;
};

export default function SignUp() {
  const router = useRouter();
  const [, setSnackbar] = useSnackbarState();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignUpFormData>({
    defaultValues: { email: "", password: "", name: "" },
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
    },
    name: {
      required: "ユーザー名を入力してください。",
    },
  };

  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth`;
      const headers = { "Content-Type": "application/json" };
      const confirmSuccessUrl = `${process.env.NEXT_PUBLIC_FRONT_BASE_URL}/sign_in`;

      const response = await axios.post(url, { ...data, confirm_success_url: confirmSuccessUrl }, { headers });

      localStorage.setItem("access-token", response.headers["access-token"] || "");
      localStorage.setItem("client", response.headers["client"] || "");
      localStorage.setItem("uid", response.headers["uid"] || "");

      setSnackbar({
        message: "認証メールをご確認ください",
        severity: "success",
        pathname: "/",
      });

      router.push("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setSnackbar({
          message: "不正なユーザー情報です",
          severity: "error",
          pathname: "/sign_up",
        });
      }
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
        <CardDescription>Create a new account by filling in your details</CardDescription>
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
            <div className="space-y-2">
              <Label htmlFor="name">Username</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                {...register("name", validationRules.name)}
              />
              {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </div>
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
