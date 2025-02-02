"use client"

import { RotateCcw } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 py-20">
      <div className="max-w-md w-full text-center space-y-8">
        <Image
          src="/500_img.png"
          alt="セイコーマート店舗イラスト"
          width={160}
          height={160}
          className="mx-auto mb-16"
        />
        <h1 className="text-5xl font-bold mb-3">500</h1>
        <h2 className="text-2xl font-bold mb-6">サーバーエラーが発生しました</h2>
        <p className="text-muted-foreground mb-12">
          申し訳ありません。サーバーで問題が発生しました。
          <br />
          しばらく時間をおいて再度お試しください。
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button onClick={reset} className="gap-2 px-6">
            <RotateCcw className="w-4 h-4" />
            再読み込み
          </Button>
          <Link href="/">
            <Button variant="outline" className="gap-2 px-6">
              トップページに戻る
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

