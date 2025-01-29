import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from 'next';
import CurrentUserFetch from './components/CurrentUserFetch';
import Footer from './components/common/Footer';
import Header from './components/common/Header';
import SuccessSnackbar from './components/common/Snackbar';
import { Toaster } from './components/ui/toaster';
import './globals.css';

export const metadata: Metadata = {
  title: 'セコマレコード',
  description:
    'セコマレコードは、「すべてのセイコーマートの店舗に行きたい」という想いから作られた、無料のセイコーマート訪問記録管理サービスです。会員登録せずに、セコマの店舗検索システムとして使用することもできます。セイコーマート非公式。',
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
