import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  fetchArticleById,
  selectArticles,
} from "../store/features/articles/articleSlice";
import CardDetail from "../components/ArticleDetailCard";

const ArticleDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const {
    currentArticle: article,
    loading,
    error,
  } = useAppSelector(selectArticles);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!id) return; // Jangan fetch jika tidak ada ID

    // Dispatch fetchArticleById
    dispatch(fetchArticleById({ id, token: token || "" }));
  }, [id, token, dispatch]);

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

export default ArticleDetailPage;
