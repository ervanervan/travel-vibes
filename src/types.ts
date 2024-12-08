export interface Article {
  id?: string;
  documentId?: string;
  title: string;
  description: string;
  cover_image_url: string;
  category?: any;
  user?: any;
  createdAt?: Date;
  updatedAt?: Date;
  publishedAt?: Date;
  comments?: any;
}

export interface WithArticles {
  articles: Article[];
}

export interface WithArticle {
  article: Article;
}
