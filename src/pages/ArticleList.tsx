import { useEffect, useState } from "react";
import { Article } from "../types";
import ArticleCard from "../components/ArticleCard";
import { getArticles } from "../services/articlesService";

const Articlelist = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        // Cek apakah ada data di localStorage
        const cachedArticles = localStorage.getItem("articles");
        if (cachedArticles) {
          setArticles(JSON.parse(cachedArticles));
        } else {
          // Fetch data jika belum ada di localStorage
          const data = await getArticles();
          setArticles(data);
          localStorage.setItem("articles", JSON.stringify(data)); // Simpan ke localStorage
        }
      } catch (err) {
        setError("Failed to fetch articles");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading)
    return (
      <div className="text-gray-600 container mx-auto p-6">Loading...</div>
    );
  if (error)
    return (
      <div className="text-red-600 container mx-auto p-6">Error: {error}</div>
    );

  return (
    <section className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold text-gray-950 mb-6">All Article</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            id={article.id}
            documentId={article.documentId}
            title={article.title}
            description={article.description}
            cover_image_url={article.cover_image_url || ""}
          />
        ))}
      </div>
    </section>
  );
};

export default Articlelist;
