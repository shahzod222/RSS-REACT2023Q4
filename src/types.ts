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
  page: number;
  setMovieId: (id: number) => void;
}

export interface CardProps {
  el: Movie;
  handleClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
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

export interface DetailsProps {
  data: Movie | null;
  handleClose: () => void;
  movieNumber: number;
}

export interface MovieDetails {
  original_title: string;
  poster_path: string;
  overview: string;
}
