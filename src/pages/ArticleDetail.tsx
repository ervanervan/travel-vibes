import { useEffect, useState } from "react";
import { Article } from "../types";
import { useParams } from "react-router-dom";
import { getArticleById } from "../services/articlesService";

const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getArticleById(id!); // Mengambil data artikel dengan ID
        setArticle(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) return <p className="text-gray-600">Loading...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;
  if (!article) return <p className="text-gray-600">No article found.</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{article.title}</h1>
      <img
        src={article.cover_image_url}
        alt={article.title}
        className="w-full h-64 object-cover rounded-md mb-6"
      />
      <p className="text-gray-600 mb-4">{article.description}</p>
    </div>
  );
};

export default ArticleDetail;
