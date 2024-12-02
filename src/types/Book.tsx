export interface Book {
  id: string;
  title: string;
  thumbnail: string;
  author: string;
  description?: string;
}

export interface BookDetails {
  bookId: string;
  title: string;
  thumbnail: string;
  author: string;
  publishedDate: string;
  rating: string;
  description: string;
  pageCount: string;
  genre: string;
  language: string;
}

export interface BooksResponse {
  books: Book[];
}

export enum BookDetailMenu {
  DETAILS = 'Samenvatting',
  REVIEWS = 'Reviews',
  PRICES = 'Prijzen',
}
