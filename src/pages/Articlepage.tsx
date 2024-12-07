import { useEffect, useState } from "react";

import { Article } from "../types";
import ArticleTable from "../components/ArticleTable";
import { createArticle, getArticles } from "../services/articlesService";

const ArticleList = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false); // State untuk modal

  // State untuk form artikel baru
  const [newArticle, setNewArticle] = useState<{
    id: string;
    documentId: string;
    title: string;
    description: string;
    cover_image_url: string;
    category: number;
  }>({
    id: "",
    documentId: "",
    title: "",
    description: "",
    cover_image_url: "",
    category: 1,
  });

  const [adding, setAdding] = useState<boolean>(false);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const data = await getArticles();
        setArticles(data);
      } catch (err) {
        setError("Failed to fetch articles");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewArticle((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddArticle = async () => {
    if (
      !newArticle.title ||
      !newArticle.description ||
      !newArticle.cover_image_url
    ) {
      alert("Please fill out all fields");
      return;
    }

    const token = localStorage.getItem("token"); // Ambil token dari localStorage
    if (!token) {
      alert("You must be logged in to add an article");
      return;
    }

    try {
      setAdding(true);
      const newEntry = await createArticle(newArticle, token);

      setArticles((prev) => [...prev, newEntry]);
      setNewArticle({
        id: "",
        documentId: "",
        title: "",
        description: "",
        cover_image_url: "",
        category: 1,
      });
      setShowModal(false); // Tutup modal setelah menambahkan data
    } catch (err) {
      console.error(err);
      alert("Failed to add article");
    } finally {
      setAdding(false);
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4">Error: {error}</div>;

  return (
    <div className="p-4 md:p-0">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl">Article List</h1>
        <button
          onClick={() => setShowModal(true)} // Tampilkan modal
          className="py-3 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 transition"
        >
          Add Data
        </button>
      </div>

      <ArticleTable articles={articles} />

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl mb-4">Add New Article</h2>
            <input
              type="text"
              name="title"
              value={newArticle.title}
              onChange={handleInputChange}
              placeholder="Title"
              className="border px-3 py-2 w-full mb-2"
            />
            <textarea
              name="description"
              value={newArticle.description}
              onChange={handleInputChange}
              placeholder="Description"
              className="border px-3 py-2 w-full mb-2"
            />
            <input
              type="text"
              name="cover_image_url"
              value={newArticle.cover_image_url}
              onChange={handleInputChange}
              placeholder="Cover Image URL"
              className="border px-3 py-2 w-full mb-2"
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)} // Tutup modal
                className="py-2 px-4 bg-gray-300 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddArticle}
                disabled={adding}
                className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition disabled:opacity-50"
              >
                {adding ? "Adding..." : "Add Article"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleList;
