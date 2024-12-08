import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addArticle } from "../store/features/articles/articleSlice";
import {
  uploadFileThunk,
  resetUploadState,
  selectUpload,
} from "../store/features/upload/uploadSlice";
import {
  fetchCategories,
  selectCategories,
} from "../store/features/category/categoriesSlice";

const AddDataArticlePage = () => {
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

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch categories when the component mounts
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      dispatch(resetUploadState()); // Reset upload state if a new file is selected
    }
  };

  useEffect(() => {
    console.log(uploadedUrl);
  }, [uploadedUrl]);

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

    if (!title || !description || !category || !uploadedUrl) {
      setError("All fields are required!");
      return;
    }

    try {
      // Dispatch addArticle
      dispatch(
        addArticle({
          article: {
            title,
            description,
            category,
            cover_image_url: uploadedUrl,
          },
          token: localStorage.getItem("token") || "",
        })
      );

      alert("Article added successfully!");
      setTitle("");
      setDescription("");
      setCategory("");
      setFile(null);
      dispatch(resetUploadState());
    } catch (err: any) {
      setError(err.message || "Failed to add article");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-lg w-full">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Add New Article
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
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
              placeholder="Enter article title"
              required
            />
          </div>

          {/* Description */}
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
              placeholder="Enter article description"
              rows={4}
              required
            />
          </div>

          {/* Category */}
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

          {/* File Upload */}
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
              required
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

          {uploadError && <p className="text-red-500 text-sm">{uploadError}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={uploading || !uploadedUrl}
            className={`w-full py-2 px-4 text-sm font-medium text-white rounded-md shadow-sm ${
              uploading || !uploadedUrl
                ? "bg-gray-400"
                : "bg-blue-500 hover:bg-blue-600"
            } transition`}
          >
            Add Article
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDataArticlePage;
