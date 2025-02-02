"use client"

import { Home } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-2">
        <Image
          src="/404_img.png"
          alt="セイコーマート店舗イラスト"
          width={200}
          height={200}
          className="mx-auto mb-16"
        />
        <h1 className="text-5xl font-bold mb-3">404</h1>
        <h2 className="text-2xl font-bold mb-6">ページが見つかりません</h2>
        <p className="text-muted-foreground mb-12">
          お探しのページは存在しないか、移動または削除された可能性があります。
        </p>
        <Link href="/">
          <Button className="gap-2 px-6">
            <Home className="w-4 h-4" />
            トップページに戻る
          </Button>
        </Link>
      </div>
    </div>
  )
}