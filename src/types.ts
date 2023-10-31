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

export interface AppState {
  search: string;
  data: Movie[];
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
