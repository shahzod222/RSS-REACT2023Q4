import React from 'react';
import { SearchProps } from '../types';

export default class Search extends React.Component<SearchProps> {
  constructor(props: SearchProps) {
    super(props);
  }

  handleInputChange = (event: { target: { value: string } }) => {
    const newSearch = event.target.value;
    this.props.onSearchChange(newSearch);
  };

  render() {
    return (
      <header className="bg-dark my-4">
        <nav className="navbar bg-transparent">
          <div className="container-fluid">
            <div className="d-flex w-100 justify-content-center" role="search">
              <input
                className="form-control me-2 w-75 "
                type="search"
                placeholder="Search..."
                aria-label="Search"
                onChange={this.handleInputChange}
                value={this.props.search}
              />
              <button className="btn btn-outline-light" onClick={this.props.onSearchClick}>
                Search
              </button>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}
