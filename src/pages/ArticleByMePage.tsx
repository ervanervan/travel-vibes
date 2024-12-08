import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  fetchArticlesByUser,
  selectArticles,
} from "../store/features/articles/articleSlice";
import ArticleTableByMe from "../components/ArticleTableByMe";
import { Link } from "react-router-dom";

const ArticlesListByMePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { articles, loading, error } = useAppSelector(selectArticles);

  // State for pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // State for filters
  const [titleFilter, setTitleFilter] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");

  // Debounced state
  const [debouncedTitleFilter, setDebouncedTitleFilter] =
    useState<string>(titleFilter);
  const [debouncedCategoryFilter, setDebouncedCategoryFilter] =
    useState<string>(categoryFilter);

  // Debounce logic
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTitleFilter(titleFilter);
      setDebouncedCategoryFilter(categoryFilter);
    }, 1000); // 1 second debounce

    return () => {
      clearTimeout(handler);
    };
  }, [titleFilter, categoryFilter]);

  // Fetch articles when filters, pagination, or debounced values change
  useEffect(() => {
    dispatch(
      fetchArticlesByUser({
        page,
        pageSize,
        filters: {
          title: debouncedTitleFilter
            ? { $eqi: debouncedTitleFilter }
            : undefined,
          category: {
            name: debouncedCategoryFilter
              ? { $eqi: debouncedCategoryFilter }
              : undefined,
          },
        },
      })
    );
  }, [dispatch, page, pageSize, debouncedTitleFilter, debouncedCategoryFilter]);

  if (loading) return <div>Loading articles...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1>Articles List</h1>
        <Link to={"add-data"}>Add data</Link>
      </div>
      {/* Filters */}
      <div className="filters">
        <input
          type="text"
          placeholder="Filter by Title"
          value={titleFilter}
          onChange={(e) => setTitleFilter(e.target.value)}
          className="border px-3 py-2 mb-4"
        />
        <input
          type="text"
          placeholder="Filter by Category"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border px-3 py-2 mb-4 ml-4"
        />
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          className="border px-3 py-2 mb-4 ml-4"
        >
          <option value={5}>5 per page</option>
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
        </select>
      </div>

      <ArticleTableByMe articles={articles} />

      {/* Pagination */}
      <div className="pagination mt-4">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 border bg-gray-200 disabled:bg-gray-100"
        >
          Previous
        </button>
        <span className="mx-2">Page {page}</span>
        <button
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 border bg-gray-200"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ArticlesListByMePage;
