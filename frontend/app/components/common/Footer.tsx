import Link from "next/link"

const Footer = () => {
  return (
    <footer className="bg-white text-gray-600 py-3 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-10 text-xs">
          <nav className="flex flex-wrap items-center gap-4">
            <Link href="https://www.seicomart.co.jp/index.html" className="hover:underline">
              セイコーマート公式HP
            </Link>
            <Link href="/privacy-policy" className="hover:underline">
              プライバシーポリシー
            </Link>
            <Link href="/terms" className="hover:underline">
              利用規約
            </Link>
            <Link
              href="https://docs.google.com/forms/d/e/1FAIpQLSdHB0L8rmAaNGsVwlV3-Qei9SHbZLCgRjaGehw2eyn7gvdZbA/viewform"
              className="hover:underline"
            >
              フィードバック
            </Link>
            <Link href="https://x.com/miyoshi3rd" className="hover:underline">
              開発者Twitter
            </Link>
          </nav>
          <div className="text-gray-500">© {new Date().getFullYear()} セコマレコード. All rights reserved.</div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

