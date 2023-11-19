import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPage, setPage } from '../store';

export function Pagination() {
  const dispatch = useDispatch();
  const page = useSelector(selectPage);

  const changePage = (pageNum: number) => {
    dispatch(setPage(pageNum));
  };

  const paginationItems = page === 1 ? [1, 2, 3] : [page - 1, page, page + 1];

  return (
    <nav>
      <ul className="pagination justify-content-center my-4 position-relative z-0">
        <li className={`page-item ${page === 1 && 'disabled'}`}>
          <button
            data-testid="prev-btn"
            className="page-link"
            disabled={page === 1}
            onClick={() => changePage(page - 1)}
          >
            Previous
          </button>
        </li>
        {paginationItems.map((pageNum) => (
          <li key={pageNum} className={`page-item ${page === pageNum && 'active'}`}>
            <button className="page-link" onClick={() => changePage(pageNum)}>
              {pageNum}
            </button>
          </li>
        ))}
        <li className="page-item">
          <button data-testid="next-btn" className="page-link" onClick={() => changePage(page + 1)}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}
