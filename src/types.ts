export interface Article {
  id: string;
  documentId: string;
  title: string;
  description: string;
  cover_image_url: string;
}

export interface WithArticles {
  articles: Article[];
}

export interface WithArticle {
  article: Article;
}
