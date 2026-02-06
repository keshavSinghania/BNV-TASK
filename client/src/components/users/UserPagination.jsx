import Button from "../ui/Button";
import React from "react";

export const UserPagination = ({ page = 1, totalPages = 1, onPageChange }) => {
  return (
    <div className="flex flex-col gap-3 border-t px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="text-sm text-gray-600 text-center sm:text-left">
        Page <span className="font-medium">{page}</span> of{" "}
        <span className="font-medium">{totalPages}</span>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <Button
          variant="secondary"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
        >
          Prev
        </Button>

        {Array.from({ length: totalPages }).map((_, idx) => {
          const pageNumber = idx + 1;
          return (
            <Button
              key={pageNumber}
              variant={page === pageNumber ? "primary" : "secondary"}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </Button>
          );
        })}

        <Button
          variant="secondary"
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
