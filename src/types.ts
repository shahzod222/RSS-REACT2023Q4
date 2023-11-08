import { ReactNode } from 'react';

export interface SearchProps {
  onSearchChange: (newSearch: string) => void;
  search: string;
  onSearchClick: () => void;
}

export interface DefaultProps {
  children?: ReactNode;
}

export interface Picture {
  id: string;
  alt_description: string;
  urls: {
    regular: string;
  };
}

export interface CardsProps {
  data: Picture[];
  page: number;
  setPictureId: (id: string) => void;
}

export interface CardProps {
  el: Picture;
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
  setPage: (page: number) => void;
}

export interface DetailsProps {
  data: Picture | null;
  handleClose: () => void;
  pictureNumber: string;
}

export interface ItemsPerPageProps {
  change: (num: number) => void;
  page: (num: number) => void;
}
