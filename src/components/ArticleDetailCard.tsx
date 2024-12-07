import React from "react";
import { useNavigate } from "react-router-dom";
import { WithArticle } from "../types";
import { ArrowLeftCircle } from "iconoir-react"; // Import ikon dari Iconoir

export interface CardDetailProps extends WithArticle {}

const CardDetail: React.FC<WithArticle> = ({ article }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-lg overflow-hidden max-w-4xl mx-auto my-10 relative">
      {/* Tombol Kembali */}
      <button
        onClick={() => navigate("/article-list")}
        className="absolute top-4 left-4 bg-gray-200 hover:bg-gray-300 text-gray-950/80 flex items-center gap-2 px-4 py-2 rounded-lg shadow-md transition-colors"
      >
        <ArrowLeftCircle width={20} height={20} />
        <span className="text-sm font-medium">Back to Articles</span>
      </button>

      <div className="h-96">
        <img
          src={article.cover_image_url}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 md:p-6">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-950 mb-4">
          {article.title}
        </h1>
        <p className="text-gray-950/70 text-lg leading-relaxed mb-6">
          {article.description}
        </p>
      </div>
    </div>
  );
};

export default CardDetail;
