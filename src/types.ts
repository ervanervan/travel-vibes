export interface Article {
  id: string;
  title: string;
  description: string;
  cover_image_url: string;
}

export interface ArticleTableProps {
  articles: Article[];
}
