import React from "react";
import { useNavigate } from "react-router-dom";
import { WithArticle } from "../types";
import { ArrowLeftCircle } from "iconoir-react"; // Import ikon dari Iconoir

export interface CardDetailProps extends WithArticle {}

const CardDetail: React.FC<WithArticle> = ({ article }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-lg overflow-hidden max-w-4xl mx-auto my-10 relative shadow-lg">
      {/* Tombol Kembali */}
      <button
        onClick={() => navigate("/article-list")}
        className="absolute top-4 left-4 bg-gray-200 hover:bg-gray-300 text-gray-950/80 flex items-center gap-2 px-4 py-2 rounded-lg shadow-md transition-colors"
      >
        <ArrowLeftCircle width={20} height={20} />
        <span className="text-sm font-medium">Back to Articles</span>
      </button>

      {/* Gambar Sampul */}
      <div className="h-96">
        <img
          src={article.cover_image_url}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Detail Artikel */}
      <div className="p-4 md:p-6">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-950 mb-4">
          {article.title}
        </h1>
        <p className="text-gray-950/70 text-lg leading-relaxed mb-6">
          {article.description}
        </p>

        {/* Informasi Penulis */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-950">Author</h2>
          <p className="text-gray-700">
            <strong>Name:</strong> {article.user?.username}
            {console.log(article)}
          </p>
          <p className="text-gray-700">
            <strong>Email:</strong> {article.user?.email}
          </p>
        </div>

        {/* Informasi Kategori */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-950">Category</h2>
          <p className="text-gray-700">
            <strong>Category Name:</strong> {article.category?.name}
          </p>
          <p className="text-gray-700">
            <strong>Description:</strong>{" "}
            {article.category?.description || "No description"}
          </p>
        </div>

        {/* Komentar */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-950 mb-4">
            Comments ({article.comments?.length})
          </h2>
          {article.comments?.length > 0 ? (
            <ul className="space-y-4">
              {article.comments?.map((comment: any) => (
                <li
                  key={comment?.id}
                  className="p-4 bg-gray-100 rounded-lg shadow-md"
                >
                  <p className="text-gray-800">{comment?.content}</p>
                  <p className="text-gray-500 text-sm mt-2">
                    <strong>Created At:</strong>{" "}
                    {new Date(comment?.createdAt).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-700">No comments available.</p>
          )}
        </div>

        {/* Metadata */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-950">Metadata</h2>
          <p className="text-gray-700">
            <strong>Created At:</strong>{" "}
            {article.createdAt
              ? new Date(article.createdAt).toLocaleString()
              : "N/A"}
          </p>
          <p className="text-gray-700">
            <strong>Published At:</strong>{" "}
            {article.publishedAt
              ? new Date(article.publishedAt).toLocaleString()
              : "N/A"}
          </p>
          <p className="text-gray-700">
            <strong>Updated At:</strong>{" "}
            {article.updatedAt
              ? new Date(article.updatedAt).toLocaleString()
              : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardDetail;
