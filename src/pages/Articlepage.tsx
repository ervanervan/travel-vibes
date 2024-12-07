import { useEffect, useState } from "react";
import { getArticles } from "../services/articlesService";
import { Article } from "../types";
import ArticleTable from "../components/ArticleTable";

const ArticleList = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const data = await getArticles();
        setArticles(data); // Simpan data ke state
      } catch (err) {
        setError("Failed to fetch articles");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4">Error: {error}</div>;

  return (
    <div className="p-4 md:p-0">
      <h1 className="text-2xl mb-4">Article List</h1>
      <ArticleTable articles={articles} />
    </div>
  );
};

export default ArticleList;
