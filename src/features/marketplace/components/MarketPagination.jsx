import Button from "@/components/common/Button";

export default function MarketPagination({ page, isPending, hasNextPage, onPrevPage, onNextPage }) {
  return (
    <section className="mt-[40px] flex items-center justify-center gap-[20px] desktop:hidden">
      <Button variant="secondary" size="xs" disabled={page === 1 || isPending} onClick={onPrevPage}>
        이전
      </Button>

      <span className="min-w-[80px] text-center text-[14px] font-bold text-white">
        {page} 페이지
      </span>

      <Button
        variant="secondary"
        size="xs"
        disabled={!hasNextPage || isPending}
        onClick={onNextPage}
      >
        다음
      </Button>
    </section>
  );
}
