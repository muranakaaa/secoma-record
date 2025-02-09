"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
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
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth`;
      const headers = { "Content-Type": "application/json" };

      const requestData = {
        email: data.email,
        password: data.password,
        name: data.name,
      };

      console.log("Request Data:", requestData);

      const response = await axios.post(url, JSON.stringify(requestData), { headers });

      console.log("SignUp Response:", response);

      if (response.data.status === "success") {
        setSnackbar({
          message: "仮登録が完了しました。認証メールをご確認ください。",
          severity: "success",
          pathname: "/",
        });

        router.push("/");
      } else {
        setSnackbar({
          message: "サインアップに失敗しました",
          severity: "error",
          pathname: "/sign_up",
        });
      }
    } catch (error) {
    console.error("SignUp Error:", error);

    let errorMessage = "不正なユーザー情報です";
    if (axios.isAxiosError(error)) {
      console.log("Axios Error:", error.response?.data);

      const errors = error.response?.data?.errors;

      if (typeof errors === "string") {
        errorMessage = errors;
      } else if (Array.isArray(errors)) {
        errorMessage = errors.join(", ");
      } else if (typeof errors === "object") {
        if (errors.full_messages && Array.isArray(errors.full_messages)) {
          errorMessage = errors.full_messages.join(", ");
        } else {
          errorMessage = Object.values(errors).flat().join(", ");
        }
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    console.log("Processed Error Message:", errorMessage);

    setSnackbar({
      message: errorMessage,
      severity: "error",
      pathname: "/sign_up",
    });
  }

  };

  return (
    <main className="container mx-auto px-4 py-6 md:py-10 flex items-center justify-center min-h-[calc(100vh-8rem)]">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">新規登録</CardTitle>
          <CardDescription>新しいアカウントを作成するには以下を入力してください</CardDescription>
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
                  autoComplete="current-password"
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
              <div className="space-y-2">
                <Label htmlFor="name">ユーザー名</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="勢子真 太郎"
                  {...register("name", validationRules.name)}
                />
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
              </div>
              <Button type="submit" className="w-full">
                登録
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            すでにアカウントをお持ちの方は{" "}
            <Link href="/sign_in" className="text-blue-600 hover:underline">
              こちら
            </Link>{" "}
            からログイン
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
