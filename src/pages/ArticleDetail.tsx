import { useEffect, useState } from "react";
import { Article } from "../types";
import { useParams } from "react-router-dom";
import { getArticleById } from "../services/articlesService";
import CardDetail from "../components/ArticleDetailCard";

const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) {
        setError("Article ID is missing.");
        setLoading(false);
        return;
      }

      if (!token) {
        setError("No authentication token found");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const cachedArticle = localStorage.getItem(`article-${id}`);
        if (cachedArticle) {
          setArticle(JSON.parse(cachedArticle));
          setLoading(false);
          return;
        }

        const data = await getArticleById(id, token);
        setArticle(data);
        localStorage.setItem(`article-${id}`, JSON.stringify(data));
      } catch (err: any) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id, token]);

  if (loading)
    return (
      <div className="text-gray-600 container mx-auto p-6">Loading...</div>
    );
  if (error)
    return (
      <div className="text-red-600 container mx-auto p-6">Error: {error}</div>
    );
  if (!article)
    return (
      <div className="text-gray-600 container mx-auto p-6">
        No article found.
      </div>
    );

  return <CardDetail article={article} />;
};

export default ArticleDetail;
