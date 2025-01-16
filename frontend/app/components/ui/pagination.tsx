import { Button } from "./button";

type PaginationProps = {
  total: number;
  current: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({ total, current, onPageChange }: PaginationProps) => {
  const MAX_VISIBLE_PAGES = 5;

  const getPages = () => {
    const pages = [];

    const half = Math.floor(MAX_VISIBLE_PAGES / 2);
    let start = Math.max(1, current - half);
    let end = Math.min(total, current + half);

    if (start === 1) {
      end = Math.min(total, MAX_VISIBLE_PAGES);
    }

    if (end === total) {
      start = Math.max(1, total - MAX_VISIBLE_PAGES + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (start > 1) {
      pages.unshift("...");
      pages.unshift(1);
    }

    if (end < total) {
      pages.push("...");
      pages.push(total);
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
      <Button onClick={() => handlePageChange(current - 1)} disabled={current <= 1}>
        前へ
      </Button>

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

      <Button onClick={() => handlePageChange(current + 1)} disabled={current >= total}>
        次へ
      </Button>
    </div>
  );
};
