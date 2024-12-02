import { render, waitFor } from '@testing-library/react-native';

import TrendingBooks from './TrendingBooks';
import { getTopFiveBooks } from './service/BookService';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';

jest.mock('./service/BookService', () => ({
  getTopFiveBooks: jest.fn(),
}));

describe('TestBook', () => {
  const mockBooks = {
    books: [
      {
        id: 1,
        title: 'Mock Book Title 1',
        thumbnail: 'https://example.com/mockbook1.jpg',
      },
      {
        id: 2,
        title: 'Mock Book Title 2',
        thumbnail: 'https://example.com/mockbook2.jpg',
      },
      {
        id: 3,
        title: 'Mock Book Title 3',
        thumbnail: 'https://example.com/mockbook3.jpg',
      },
      {
        id: 4,
        title: 'Mock Book Title 4',
        thumbnail: 'https://example.com/mockbook4.jpg',
      },
      {
        id: 5,
        title: 'Mock Book Title 5',
        thumbnail: 'https://example.com/mockbook5.jpg',
      },
    ],
  };

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  beforeEach(() => {
    jest.clearAllMocks();
    queryClient.clear();
  });

  const renderWithQueryClient = (ui) => {
    return render(
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>{ui}</NavigationContainer>
      </QueryClientProvider>
    );
  };
  it('displays loading indicator while fetching data', async () => {
    (getTopFiveBooks as jest.Mock).mockImplementation(
      () => new Promise(() => {})
    );

    const { getByTestId } = renderWithQueryClient(<TrendingBooks />);

    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('displays error message if fetching fails', async () => {
    (getTopFiveBooks as jest.Mock).mockRejectedValue(
      new Error('Network error')
    );

    const { queryByTestId } = renderWithQueryClient(<TrendingBooks />);

    await waitFor(() => expect(queryByTestId('error-message')).toBeTruthy());
  });
  it('displays the book of the day after fetching data', async () => {
    (getTopFiveBooks as jest.Mock).mockResolvedValue({ data: mockBooks });

    const { getAllByTestId } = renderWithQueryClient(<TrendingBooks />);

    await waitFor(() => expect(getAllByTestId('book-title')).toHaveLength(5));
  });
});
