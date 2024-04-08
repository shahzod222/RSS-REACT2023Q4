import React from 'react';
import { ErrorBoundaryState, DefaultProps } from './types';

export class ErrorBoundary extends React.Component<DefaultProps, ErrorBoundaryState> {
  constructor(props: DefaultProps) {
    super(props);
    this.state = { hasError: false, error: '' };
  }

  componentDidCatch(error: Error) {
    this.setState({ hasError: true, error: error.toString() });
    console.error('Error caught by ErrorBoundary:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <h4 className="text-danger">{this.state.error}</h4>
          <h4>
            <a className="text-dark" href="">
              Reload page
            </a>
          </h4>
        </>
      );
    }

    return this.props.children;
  }
}
