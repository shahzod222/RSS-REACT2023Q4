import { useState } from 'react';
import React from 'react';

export function ErrorButton() {
  const [hasError, setHasError] = useState(false);

  const handleClick = () => {
    setHasError(true);
  };

  if (hasError) {
    throw new Error('This is a test error');
  }

  return (
    <button className="btn btn-outline-danger" onClick={handleClick}>
      Throw an error
    </button>
  );
}
