import React, { Component } from 'react';
import { ErrorBoundaryState, ErrorBoundaryProps } from './types';

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch() {
    console.error('error boundary did catch error');
    this.setState({ hasError: true });
  }

  render() {
    return <>{this.state.hasError ? <h1>404</h1> : <>{this.props.children}</>}</>;
  }
}
