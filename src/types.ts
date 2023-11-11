import { ReactNode } from 'react';

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
