"use client";

import Pagination from "@/components/common/Pagination";

const MyShopPagination = ({ page, meta, limit, setPage }) => {
  return (
    <div>
      <Pagination
        page={page}
        totalCount={meta?.totalCount ?? 0}
        pageSize={limit}
        onPageChange={setPage}
      />
    </div>
  );
};

export default MyShopPagination;
