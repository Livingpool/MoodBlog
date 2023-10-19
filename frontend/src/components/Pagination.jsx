import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function CircularPagination({ totalPage, page, setPage }) {
  const next = () => {
    if (page < totalPage) setPage(page + 1);
  };

  const prev = () => {
    if (page > 1) setPage(page - 1);
  };

  const maxVisibleButtons = 5;

  const calculateMinPage = () => {
    let minPage = page - Math.floor(maxVisibleButtons / 2);
    if (page + Math.floor(maxVisibleButtons / 2) > totalPage) {
      minPage = totalPage - maxVisibleButtons + 1;
    }
    return Math.max(minPage, 1);
  };

  const calculateMaxPage = () => {
    let maxPage = page + Math.floor(maxVisibleButtons / 2);
    if (page - Math.floor(maxVisibleButtons / 2) < 1) {
      maxPage = maxVisibleButtons;
    }
    return Math.min(maxPage, totalPage);
  };

  const getItemProps = (index) => ({
    variant: page === index ? "filled" : "text",
    color: "gray",
    onClick: () => setPage(index),
    className: "rounded-full"
  });

  const renderPageNumbers = () => {
    const pageButtons = [];
    for (let i = calculateMinPage(); i <= calculateMaxPage(); i++) {
      pageButtons.push(
        <IconButton {...getItemProps(i)} key={i}>
          {i}
        </IconButton>
      );
    }
    return pageButtons;
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full"
        onClick={prev}
        disabled={page === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-2">{renderPageNumbers()}</div>
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full"
        onClick={next}
        disabled={page === totalPage}
      >
        Next
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}
