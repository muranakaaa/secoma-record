import type { Metadata } from 'next';
import CurrentUserFetch from './components/CurrentUserFetch';
import Footer from './components/common/Footer';
import Header from './components/common/Header';
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
  return (
    <html lang="ja">
      <body>
        <CurrentUserFetch />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
