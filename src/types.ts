// Tipe untuk artikel
export interface Article {
  id: number;
  documentId: string;
  title: string;
  description: string;
  cover_image_url: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
}

// Tipe untuk pagination metadata
export interface PaginationMeta {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}
