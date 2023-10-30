import { PaginationProps } from '../types';

export function Pagination(props: PaginationProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const clicked = Number((e.target as HTMLButtonElement).textContent);
    changePage(clicked);
  };

  const handlePrevious = () => {
    const newPage = props.page - 1;
    changePage(newPage);
  };

  const handleNext = () => {
    const newPage = props.page + 1;
    changePage(newPage);
  };

  const changePage = (page: number) => {
    props.setPage(page);
  };

  const isFirst = props.page === 1;
  const isLast = props.lastPage === props.page;
  const isNextLast = props.lastPage === props.page + 1;

  return (
    <nav>
      <ul className="pagination justify-content-center my-4">
        <li className={`page-item ${isFirst && 'disabled'}`}>
          <button className="page-link" disabled={isFirst} onClick={handlePrevious}>
            Previous
          </button>
        </li>
        <li className="page-item">
          <button className={`page-link ${isFirst && 'active'}`} onClick={handleClick}>
            {isFirst
              ? 1
              : isNextLast
              ? props.lastPage - 2
              : isLast
              ? props.lastPage - 2
              : props.page - 1}
          </button>
        </li>
        <li className="page-item">
          <button className={`page-link ${!isFirst && !isLast && 'active'}`} onClick={handleClick}>
            {isFirst
              ? 2
              : isNextLast
              ? props.lastPage - 1
              : isLast
              ? props.lastPage - 1
              : props.page}
          </button>
        </li>
        <li className="page-item">
          <button className={`page-link ${isLast && 'active'}`} onClick={handleClick}>
            {isFirst ? 3 : isLast ? props.lastPage : props.page + 1}
          </button>
        </li>
        <li className="page-item">
          <button
            className={`page-link ${isLast && 'disabled'}`}
            disabled={isLast}
            onClick={handleNext}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}
