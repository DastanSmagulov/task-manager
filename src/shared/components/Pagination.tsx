import React from "react";
import "../../styles/Pagination.scss";

interface PaginationProps {
  page: number;
  totalPages: number;
  itemsPerPage: number;
  onPageChange: (newPage: number) => void;
  onItemsPerPageChange: (newItemsPerPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="pagination">
      <button
        className="pagination-btn"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        Prev
      </button>

      <div className="page-numbers">
        {pages.map((pg) => (
          <button
            key={pg}
            className={`pagination-page ${pg === page ? "active" : ""}`}
            onClick={() => onPageChange(pg)}
          >
            {pg}
          </button>
        ))}
      </div>

      <button
        className="pagination-btn"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        Next
      </button>

      <select
        className="items-per-page"
        value={itemsPerPage}
        onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
      >
        <option value={5}>5 per page</option>
        <option value={10}>10 per page</option>
        <option value={20}>20 per page</option>
      </select>
    </div>
  );
};

export default Pagination;
