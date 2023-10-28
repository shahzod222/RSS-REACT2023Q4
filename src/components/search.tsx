import React from 'react';
import { SearchProps } from '../types';
import { ErrorButton } from './errorbutton';

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
      <header>
        <nav className="my-4 navbar">
          <div className="container-fluid">
            <div className="d-flex w-100 justify-content-center" role="search">
              <input
                className="form-control w-75 "
                type="search"
                placeholder="Search..."
                aria-label="Search"
                onChange={this.handleInputChange}
                value={this.props.search}
              />
              <button className="btn btn-outline-dark mx-3" onClick={this.props.onSearchClick}>
                Search
              </button>
              <ErrorButton />
            </div>
          </div>
        </nav>
      </header>
    );
  }
}
