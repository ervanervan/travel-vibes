import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  fetchArticleById,
  updateArticle,
} from "../store/features/articles/articleSlice";
import {
  uploadFileThunk,
  resetUploadState,
  selectUpload,
} from "../store/features/upload/uploadSlice";
import {
  fetchCategories,
  selectCategories,
} from "../store/features/category/categoriesSlice";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeftCircle } from "iconoir-react";

const EditDataArticlePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    categories,
    loading: loadingCategories,
    error: categoryError,
  } = useAppSelector(selectCategories);
  const {
    uploading,
    error: uploadError,
    uploadedUrl,
  } = useAppSelector(selectUpload);
  const { currentArticle, loading: loadingArticle } = useAppSelector(
    (state) => state.articles
  );

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchCategories());
    if (id) {
      const token = localStorage.getItem("token") || "";
      dispatch(fetchArticleById({ id, token }));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (currentArticle) {
      setTitle(currentArticle.title || "");
      setDescription(currentArticle.description || "");
      setCategory(currentArticle.category || "");
    }
  }, [currentArticle]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      dispatch(resetUploadState());
    }
  };

  const handleUpload = () => {
    if (!file) {
      setError("Please select a file to upload");
      return;
    }
    dispatch(uploadFileThunk(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title || !description || !category) {
      setError("All fields are required!");
      return;
    }

    try {
      const token = localStorage.getItem("token") || "";
      dispatch(
        updateArticle({
          id: id || "",
          article: {
            title,
            description,
            category,
            cover_image_url: uploadedUrl || currentArticle?.cover_image_url,
          },
          token,
        })
      );

      alert("Article updated successfully!");
      navigate("/dashboard/articles-user");
    } catch (err: any) {
      setError(err.message || "Failed to update article");
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-lg w-full">
        <div className="flex items-center justify-between mb-6">
          <Link
            to={"/dashboard/articles-user"}
            className="flex items-center gap-1"
          >
            <ArrowLeftCircle />
            <span>Back</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 text-center">
            Edit Article
          </h1>
          <div></div>
        </div>
        {loadingArticle ? (
          <p>Loading article...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                rows={4}
                required
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              >
                <option value="" disabled>
                  {loadingCategories
                    ? "Loading categories..."
                    : "Select a category"}
                </option>
                {categories?.length &&
                  categories?.map((cat: any) => (
                    <option key={cat?.id} value={cat?.id}>
                      {cat?.name}
                    </option>
                  ))}
              </select>
              {categoryError && (
                <p className="text-red-500 text-sm mt-2">{categoryError}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="file"
                className="block text-sm font-medium text-gray-700"
              >
                Cover Image
              </label>
              <input
                type="file"
                id="file"
                onChange={handleFileChange}
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
              />
              {file && (
                <button
                  type="button"
                  onClick={handleUpload}
                  disabled={uploading}
                  className={`mt-2 px-4 py-2 text-sm font-medium text-white rounded-md shadow-sm ${
                    uploading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
                  } transition`}
                >
                  {uploading ? "Uploading..." : "Upload Image"}
                </button>
              )}
            </div>

            {uploadError && (
              <p className="text-red-500 text-sm">{uploadError}</p>
            )}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={uploading}
              className={`w-full py-2 px-4 text-sm font-medium text-white rounded-md shadow-sm ${
                uploading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
              } transition`}
            >
              Update Article
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditDataArticlePage;
