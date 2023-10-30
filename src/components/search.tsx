import { SearchProps } from '../types';
import { ErrorButton } from './errorbutton';

function Search(props: SearchProps) {
  const handleInputChange = (event: { target: { value: string } }) => {
    const newSearch = event.target.value;
    props.onSearchChange(newSearch);
  };

  return (
    <header>
      <nav className="my-4 navbar">
        <div className="container-fluid">
          <div className="d-flex w-100 justify-content-center" role="search">
            <input
              className="form-control w-75"
              type="search"
              placeholder="Search..."
              aria-label="Search"
              onChange={handleInputChange}
              value={props.search}
            />
            <button className="btn btn-outline-dark mx-3" onClick={props.onSearchClick}>
              Search
            </button>
            <ErrorButton />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Search;
