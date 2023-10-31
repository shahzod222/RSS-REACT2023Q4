import React from 'react';
import { DefaultProps, ErrorButtonState } from '../types';

export class ErrorButton extends React.Component<DefaultProps, ErrorButtonState> {
  constructor(props: DefaultProps) {
    super(props);
    this.state = {
      hasError: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      throw new Error('This is test Error');
    }

    return (
      <button className="btn btn-outline-danger" onClick={this.handleClick}>
        Throw an error
      </button>
    );
  }
}
