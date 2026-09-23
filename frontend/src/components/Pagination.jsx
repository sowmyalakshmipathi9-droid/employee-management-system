const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="pagination">
      <button
        type="button"
        className="page-btn"
        disabled={currentPage === 1}
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
      >
        Prev
      </button>

      {[...Array(totalPages)].map((_, index) => {
        const pageNumber = index + 1;

        return (
          <button
            key={pageNumber}
            type="button"
            className={pageNumber === currentPage ? 'page-btn active' : 'page-btn'}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        );
      })}

      <button
        type="button"
        className="page-btn"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
