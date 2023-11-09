import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Details } from '../components/details';

describe('Details component tests', () => {
  it('should display loading indicator while fetching data', () => {
    const { getByText } = render(<Details data={null} handleClose={() => {}} pictureNumber="1" />);
    const loadingElement = getByText('Loading...');

    expect(loadingElement).toBeInTheDocument();
  });

  const cardData = {
    id: '1',
    urls: {
      regular: 'https://example.com/image.jpg',
    },
    alt_description: 'A beautiful image',
  };

  it('should display detailed card data', () => {
    const { getByText, getByAltText } = render(
      <Details data={cardData} handleClose={() => {}} pictureNumber="1" />
    );

    const closeButton = getByText('Close');
    const imageElement = getByAltText(cardData.alt_description);

    expect(closeButton).toBeInTheDocument();
    expect(imageElement).toBeInTheDocument();
    expect((imageElement as HTMLImageElement).src).toBe(cardData.urls.regular);
  });

  it('should hide the component when clicking the close button', () => {
    const handleCloseMock = jest.fn();

    const { getByText } = render(
      <Details data={cardData} handleClose={handleCloseMock} pictureNumber="1" />
    );

    const closeButton = getByText('Close');
    fireEvent.click(closeButton);

    expect(handleCloseMock).toHaveBeenCalled();
  });

  it('should not hide the component when clicking the inner content', () => {
    const handleCloseMock = jest.fn();

    const { getByTestId } = render(
      <Details data={cardData} handleClose={handleCloseMock} pictureNumber="1" />
    );

    const innerContent = getByTestId('inner-content');
    fireEvent.click(innerContent);

    expect(handleCloseMock).not.toHaveBeenCalled();
  });
});
