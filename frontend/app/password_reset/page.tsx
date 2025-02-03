"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"

type PasswordResetFormData = {
  email: string
}

export default function PasswordResetPage() {
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordResetFormData>({
    defaultValues: { email: "" },
  })

  const onSubmit: SubmitHandler<PasswordResetFormData> = async (data) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("パスワードリセットメールを送信しました。");
        setError("");

        setTimeout(() => {
          router.push("/sign_in")
        }, 2000);
      } else {
        setError(result.errors?.[0] || "パスワードリセットに失敗しました。");
        setMessage("");
      }
    } catch (err) {
      console.error("パスワードリセットAPIエラー:", err);
      setError("通信エラーが発生しました。");
      setMessage("");
    }
  };

  return (
    <main className="container mx-auto px-4 py-6 md:py-10 flex items-center justify-center min-h-[calc(100vh-8rem)]">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">パスワードリセット</CardTitle>
          <CardDescription>パスワードを再設定するためのメールを送信します</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">メールアドレス</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@example.com"
                  {...register("email", {
                    required: "メールアドレスを入力してください。",
                    pattern: {
                      value: /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                      message: "正しい形式のメールアドレスを入力してください。",
                    },
                  })}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>
              {message && <p className="text-green-500 text-sm">{message}</p>}
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button type="submit" className="w-full">
                送信
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            <a href="/sign_in" className="text-blue-600 hover:underline">
              ログイン画面へ戻る
            </a>
          </p>
        </CardFooter>
      </Card>
    </main>
  )
}
