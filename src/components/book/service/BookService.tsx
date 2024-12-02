import {
  BOOK_SERVICE_URL,
  BOOK_SERVICE_URL_BY_VISON,
  BOOK_SERVICE_URL_TOP_FIVE,
} from './BookService.constants';
import { Book, BookDetails, BooksResponse } from '../../../types/Book';
import AxiosLumios from '../../../utils/axiosLumios';

export function getTopFiveBooks() {
  return AxiosLumios.get<BooksResponse>(BOOK_SERVICE_URL_TOP_FIVE);
}

export function getBookDetails(bookId: string) {
  console.log(bookId);
  return AxiosLumios.get<BookDetails>(`${BOOK_SERVICE_URL}/${bookId}`);
}

export function getBookByQuery(query: string) {
  return AxiosLumios.get<BooksResponse>(
    `${BOOK_SERVICE_URL}?searchQuery=${query}`
  );
}

export function getBookByVision(data: unknown) {
  return AxiosLumios.post<string>(BOOK_SERVICE_URL_BY_VISON, data);
}
