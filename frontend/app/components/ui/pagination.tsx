import { Button } from "./button";

type PaginationProps = {
  total: number; // 総ページ数
  current: number; // 現在のページ
  onPageChange: (page: number) => void; // ページ変更時のコールバック
};

export const Pagination = ({ total, current, onPageChange }: PaginationProps) => {
  const MAX_VISIBLE_PAGES = 5; // 表示する最大ページ数

  const getPages = () => {
    const pages = [];

    // 計算するページ範囲
    const half = Math.floor(MAX_VISIBLE_PAGES / 2);
    let start = Math.max(1, current - half);
    let end = Math.min(total, current + half);

    // 調整: 最初のページに近い場合
    if (start === 1) {
      end = Math.min(total, MAX_VISIBLE_PAGES);
    }

    // 調整: 最後のページに近い場合
    if (end === total) {
      start = Math.max(1, total - MAX_VISIBLE_PAGES + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // 必要に応じて "..." を追加
    if (start > 1) {
      pages.unshift("..."); // 省略記号
      pages.unshift(1); // 最初のページ
    }

    if (end < total) {
      pages.push("..."); // 省略記号
      pages.push(total); // 最後のページ
    }

    return pages;
  };

  const pages = getPages();

  const handlePageChange = (page: number | string) => {
    if (typeof page === "number") {
      onPageChange(page);
    }
  };

  return (
    <div className="flex justify-center items-center space-x-2 mt-4">
      {/* 前へボタン */}
      <Button onClick={() => handlePageChange(current - 1)} disabled={current <= 1}>
        前へ
      </Button>

      {/* ページ番号 */}
      {pages.map((page, index) =>
        typeof page === "number" ? (
          <Button
            key={index}
            variant={page === current ? "default" : "outline"}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </Button>
        ) : (
          <span key={index} className="px-2">
            {page}
          </span>
        )
      )}

      {/* 次へボタン */}
      <Button onClick={() => handlePageChange(current + 1)} disabled={current >= total}>
        次へ
      </Button>
    </div>
  );
};
