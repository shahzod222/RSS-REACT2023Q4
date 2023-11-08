import { Cards } from '../components/cards';
import { render, cleanup } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';

afterEach(() => {
  cleanup();
});

test('renders specified number of cards', () => {
  const data = [
    {
      id: 'AdkJ-LgpTrE',
      alt_description: 'a man standing in the middle of a canyon',
      urls: {
        regular:
          'https://images.unsplash.com/photo-1683009427619-a1a11b799e05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MjUwMzF8MXwxfHNlYXJjaHwxfHxuYXR1cmV8ZW58MHx8fHwxNjk5MzM3MTMzfDA&ixlib=rb-4.0.3&q=80&w=1080',
      },
    },
    {
      id: 'cssvEZacHvQ',
      alt_description: 'gray concrete bridge and waterfalls during daytime',
      urls: {
        regular:
          'https://images.unsplash.com/photo-1433086966358-54859d0ed716?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MjUwMzF8MHwxfHNlYXJjaHwyfHxuYXR1cmV8ZW58MHx8fHwxNjk5MzM3MTMzfDA&ixlib=rb-4.0.3&q=80&w=1080',
      },
    },
    {
      id: '01_igFr7hd4',
      alt_description: 'a man standing in the middle of a canyon',
      urls: {
        regular:
          'https://images.unsplash.com/photo-1501854140801-50d01698950b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MjUwMzF8MHwxfHNlYXJjaHwzfHxuYXR1cmV8ZW58MHx8fHwxNjk5MzM3MTMzfDA&ixlib=rb-4.0.3&q=80&w=1080',
      },
    },
  ];

  const { getAllByTestId } = render(<Cards data={data} setPictureId={() => {}} />);

  const cards = getAllByTestId('card');
  expect(cards).toHaveLength(data.length);
});

test('displays "No data" message when no cards are present', () => {
  render(<Cards data={[]} setPictureId={() => {}} />);

  const noDataMessage = screen.getByText('No data') as HTMLElement;
  expect(noDataMessage).toBeInTheDocument();
});
