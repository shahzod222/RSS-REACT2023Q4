import { PaginationProps } from '../types';
import { useNavigate } from 'react-router-dom';

export function Pagination(props: PaginationProps) {
  const navigate = useNavigate();

  const handleClick = (page: number) => {
    changePage(page);
  };

  const handlePrevious = () => {
    if (props.page > 1) {
      changePage(props.page - 1);
    }
  };

  const handleNext = () => {
    if (props.page < props.lastPage) {
      changePage(props.page + 1);
    }
  };

  const changePage = (page: number) => {
    props.setPage(page);
    navigate(`/page/${page}`);
  };

  const isFirst = props.page === 1;
  const isLast = props.page === props.lastPage;

  return (
    <nav>
      <ul className="pagination justify-content-center my-4">
        <li className={`page-item ${isFirst && 'disabled'}`}>
          <button className="page-link" disabled={isFirst} onClick={handlePrevious}>
            Previous
          </button>
        </li>
        <li className="page-item">
          <button className={`page-link ${isFirst ? 'active' : ''}`} onClick={() => handleClick(1)}>
            1
          </button>
        </li>
        {props.page > 3 && (
          <li className="page-item disabled">
            <span className="page-link">...</span>
          </li>
        )}
        {props.page > 2 && (
          <li className="page-item">
            <button className="page-link" onClick={() => handleClick(props.page - 1)}>
              {props.page - 1}
            </button>
          </li>
        )}
        {props.page !== 1 && props.page !== props.lastPage && (
          <li className="page-item">
            <button className={`page-link active`}>{props.page}</button>
          </li>
        )}
        {props.page < props.lastPage - 1 && (
          <li className="page-item">
            <button className="page-link" onClick={() => handleClick(props.page + 1)}>
              {props.page + 1}
            </button>
          </li>
        )}
        {props.page < props.lastPage - 2 && (
          <li className="page-item disabled">
            <span className="page-link">...</span>
          </li>
        )}
        <li className="page-item">
          <button
            className={`page-link ${isLast ? 'active' : ''}`}
            onClick={() => handleClick(props.lastPage)}
          >
            {props.lastPage}
          </button>
        </li>
        <li className={`page-item ${isLast && 'disabled'}`}>
          <button className="page-link" disabled={isLast} onClick={handleNext}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}
