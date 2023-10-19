import { useState } from "react";
import CircularPagination from "../../components/Pagination";
import Layout from "../../partials/dashboard/Layout";

export default function PaginationPage() {
  const [page, setPage] = useState(1);
  const mockData = {
    totalPage: 20
  }
  return (
    <Layout>
      <div className="flex justify-center pt-20">
        <CircularPagination page={page} setPage={setPage} totalPage={mockData.totalPage} />
      </div>
    </Layout>
  );
}
