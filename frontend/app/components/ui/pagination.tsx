import { Button } from "./button";

type PaginationProps = {
  total: number;
  current: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({ total, current, onPageChange }: PaginationProps) => {
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= total) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex justify-center items-center space-x-2 mt-4">
      <Button onClick={() => handlePageChange(current - 1)} disabled={current <= 1}>
        前へ
      </Button>
      {Array.from({ length: total }, (_, i) => i + 1).map((page) => (
        <Button
          key={page}
          variant={page === current ? "default" : "outline"}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </Button>
      ))}
      <Button onClick={() => handlePageChange(current + 1)} disabled={current >= total}>
        次へ
      </Button>
    </div>
  );
};
