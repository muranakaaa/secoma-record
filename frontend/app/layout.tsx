import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from 'next';
import CurrentUserFetch from './components/CurrentUserFetch';
import Footer from './components/common/Footer';
import Header from './components/common/Header';
import SuccessSnackbar from './components/common/Snackbar';
import { Toaster } from './components/ui/toaster';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL("https://secoma-record.com"),
  title: '【セコマレコード】セイコーマート全店制覇を目指す人のための訪問記録管理アプリ',
  description:
    '【セコマレコード】セイコーマート全店舗コンプリートに向けた訪問記録管理アプリです（非公式）。エリアごとの店舗検索や訪問記録の管理ができるため、効率的に訪問計画を立てられます。セコマ巡りの旅をより楽しく、よりスムーズに進められるよう、あなたの“セコマ制覇”をサポートします。',
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SEARCH_CONSOLE_CONTENT,
  },
  openGraph: {
    title: 'セコマレコード',
    description:
      'セイコーマート全店制覇を目指す人のための訪問記録管理アプリです（非公式）。エリアごとの店舗検索や訪問記録の管理ができるため、効率的に訪問計画を立てられます。セコマ巡りの旅をより楽しく、よりスムーズに進められるよう、あなたの“セコマ制覇”をサポートします。',
    url: 'https://secoma-record.com',
    siteName: 'セコマレコード',
    images: [
      {
        url: '/ogp/thumbnail.png',
        width: 1200,
        height: 630,
        alt: 'セコマレコードのOGP画像',
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: "https://secoma-record.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;
  return (
    <html lang="ja">
      <body>
        <CurrentUserFetch />
        <Header />
        {children}
        <Footer />
        <SuccessSnackbar />
        <Toaster />
        {gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  );
}
