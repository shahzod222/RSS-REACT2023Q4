import React from 'react';
import { AppProps, AppState } from './types';
import Search from './components/search';
import Cards from './components/card';
import { ErrorBoundary } from './errorboundary';

export default class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      search: localStorage.getItem('search') || '',
      data: [],
    };
  }

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate() {
    localStorage.setItem('search', this.state.search);
  }

  getData() {
    const apiKey = '1e78e4c09cd2d96c02dfecde6654a420';
    const defaultUrl = `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`;
    const url =
      this.state.search !== ''
        ? `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${this.state.search}`
        : defaultUrl;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ data: data.results });
      });
  }

  handleSearchChange = (newSearch: string) => {
    this.setState({ search: newSearch });
  };

  handleSearchClick = () => {
    this.setState({ data: [] });
    this.getData();
  };

  handleThrowError = () => {
    console.log('Throwing an error');
    throw new Error('This is a test error');
  };

  render() {
    return (
      <ErrorBoundary>
        <Search
          search={this.state.search}
          onSearchChange={this.handleSearchChange}
          onSearchClick={this.handleSearchClick}
        />
        <button onClick={this.handleThrowError}>Throw an Error</button>
        <Cards data={this.state.data} />
      </ErrorBoundary>
    );
  }
}
