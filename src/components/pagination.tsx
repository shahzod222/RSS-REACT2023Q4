import { useNavigate } from 'react-router-dom';
import { PaginationProps } from '../types';

export function Pagination(props: PaginationProps) {
  const navigate = useNavigate();

  const changePage = (page: number) => {
    props.setPage(page);
    navigate(`/page/${page}`);
  };

  const paginationItems =
    props.page === 1 ? [1, 2, 3] : [props.page - 1, props.page, props.page + 1];

  return (
    <nav>
      <ul className="pagination justify-content-center my-4 position-relative z-0">
        <li className={`page-item ${props.page === 1 && 'disabled'}`}>
          <button
            className="page-link"
            disabled={props.page === 1}
            onClick={() => changePage(props.page - 1)}
          >
            Previous
          </button>
        </li>
        {paginationItems.map((page) => (
          <li key={page} className={`page-item ${props.page === page && 'active'}`}>
            <button className="page-link" onClick={() => changePage(page)}>
              {page}
            </button>
          </li>
        ))}
        <li className="page-item">
          <button className="page-link" onClick={() => changePage(props.page + 1)}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}
