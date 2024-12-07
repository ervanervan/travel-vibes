import { useEffect, useState } from "react";
import { getArticles } from "../services/articlesApi";
import { Article, PaginationMeta } from "../types";

const ArticlePage = () => {
  const [articles, setArticles] = useState<Article[]>([]); // Tipe array artikel
  const [meta, setMeta] = useState<PaginationMeta | null>(null); // Tipe meta bisa null awalnya
  const [error, setError] = useState<string>(""); // Tipe string untuk error
  const [page, setPage] = useState<number>(1); // Tipe number untuk pagination

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { articles, meta } = await getArticles(page);
        setArticles(articles);
        setMeta(meta);
      } catch (err) {
        setError("Failed to fetch articles.");
      }
    };

    fetchArticles();
  }, [page]);

  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Articles</h1>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <h3>{article.title || "Untitled"}</h3>
            <p>{article.description || "No description"}</p>
            <img
              src={article.cover_image_url}
              alt={article.title || "Cover"}
              width={100}
            />
          </li>
        ))}
      </ul>
      <div>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          onClick={() =>
            setPage((prev) =>
              meta?.pageCount && prev < meta.pageCount ? prev + 1 : prev
            )
          }
          disabled={page === meta?.pageCount}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ArticlePage;
