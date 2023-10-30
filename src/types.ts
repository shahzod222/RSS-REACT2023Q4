import { ReactNode } from 'react';

export interface SearchProps {
  onSearchChange: (newSearch: string) => void;
  search: string;
  onSearchClick: () => void;
}

export interface DefaultProps {
  children?: ReactNode;
}

export interface Movie {
  title: string;
  poster_path: string;
  overview: string;
  id: number;
}

export interface CardsProps {
  data: Movie[];
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: string;
}

export interface ErrorButtonState {
  hasError: boolean;
}

export interface PaginationProps {
  page: number;
  lastPage: number;
  setPage: (page: number) => void;
}
