import { Info } from "lucide-react";
import { Suspense } from "react";
import { fetchAreasWithToken } from "@/lib/fetchAreasWithToken";
import AreaList from "./components/AreaList";
import SearchForm from "./components/SearchForm";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";

const HomePage = async () => {
  const areas = await fetchAreasWithToken();

  return (
    <main className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">セコマレコード</CardTitle>
          <p className="text-center text-sm md:text-lg leading-tight text-nowrap">セコマ巡りの旅を、より楽しく、よりスムーズに。</p>
        </CardHeader>
        <CardContent>
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h2 className="text-lg font-semibold mb-2 flex items-center">
              <Info className="w-5 h-5 mr-2 text-blue-500" />
              セコマレコードとは？
            </h2>
            <p className="text-sm text-gray-700">
              セイコーマート全店制覇を目指す人のための訪問記録管理アプリです。
              <span className="block mt-2 text-xs text-gray-500">セイコーマート非公式</span>
            </p>
          </div>
          <SearchForm />
          <div>
            <h2 className="text-xl font-semibold mb-4">エリアで選ぶ</h2>
            <Suspense fallback={<p className="text-center text-gray-500">読み込み中...</p>}>
              <AreaList />
            </Suspense>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default HomePage;
export const dynamic = 'force-dynamic'