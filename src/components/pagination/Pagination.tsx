import { useEffect, useState } from "react";

interface PaginationProps {
  maxPage: number; // max page size
  pageCountPerPage: number;
  clickListener: (page: number) => void; //event listener
}
function Pagination({
  maxPage,
  pageCountPerPage,
  clickListener,
}: PaginationProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [startPage, setStartPage] = useState<number>(1);
  const [endPage, setEndPage] = useState<number>(pageCountPerPage);

  const pages: number[] = Array.from({ length: maxPage + 1 }, (_, i) => i);

  useEffect(() => {
    if (maxPage < pageCountPerPage) setEndPage(maxPage);
  }, [maxPage, pageCountPerPage]);

  const clickedLeftPage = () => {
    const getStartPage =
      startPage - pageCountPerPage > 1 ? startPage - pageCountPerPage : 1;

    const getCurrentPage =
      startPage - pageCountPerPage >= 1
        ? currentPage - pageCountPerPage
        : startPage - 1;
    setCurrentPage(getCurrentPage);
    setStartPage(getStartPage);
    setEndPage(getStartPage + pageCountPerPage - 1);
    clickListener(getCurrentPage);
  };
  const clickedRightPage = () => {
    const getEndPage =
      endPage + pageCountPerPage < maxPage
        ? endPage + pageCountPerPage
        : maxPage;
    const current =
      endPage + pageCountPerPage < maxPage
        ? currentPage + pageCountPerPage
        : startPage + pageCountPerPage;
    setCurrentPage(current);
    setStartPage(startPage + pageCountPerPage);
    setEndPage(getEndPage);
    clickListener(current);
  };

  const clickedPageNumber = (page: number) => {
    setCurrentPage(page);
    clickListener(page);

    if (page === maxPage && endPage < maxPage) {
      setStartPage(
        Math.floor((maxPage - 1) / pageCountPerPage) * pageCountPerPage + 1
      );
      setEndPage(maxPage);
    }
  };

  return (
    <div className="m-5 flex justify-center items-center gap-2">
      <button onClick={clickedLeftPage} disabled={startPage === 1}>
        &lt;
      </button>
      <div className="flex flex-row gap-1">
        {pages.slice(startPage, endPage + 1).map((page, idx) => (
          <button
            className={`rounded-md w-7 h-7 ${
              currentPage === page ? "text-white bg-background" : "bg-white"
            }`}
            key={idx}
            onClick={() => clickedPageNumber(page)}
          >
            {page}
          </button>
        ))}

        {endPage < maxPage && (
          <>
            <span>...</span>
            <button
              className={`rounded-md w-7 h-7 ${
                currentPage === maxPage
                  ? "text-white bg-background"
                  : "bg-white"
              }`}
              onClick={() => clickedPageNumber(maxPage)}
            >
              {maxPage}
            </button>
          </>
        )}
      </div>

      <button onClick={clickedRightPage} disabled={endPage === maxPage}>
        &gt;
      </button>
    </div>
  );
}

export default Pagination;
