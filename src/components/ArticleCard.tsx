import { useNavigate } from "react-router-dom";
import { Article } from "../types";

const ArticleCard = ({
  documentId,
  title,
  //   description,
  cover_image_url,
}: Article) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/articles/${documentId}`);
  };

  return (
    <div className="bg-white rounded-lg p-4 duration-300">
      <img
        src={cover_image_url}
        alt={title}
        className="w-full h-52 object-cover rounded-md"
      />
      <h3 className="mt-4 text-lg font-bold text-gray-800">{title}</h3>
      {/* <p className="mt-2 text-sm text-gray-600 line-clamp-2">
        {description || "No description available."}
      </p> */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent card click from triggering
          handleNavigate();
        }}
        className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 transition-colors duration-300 cursor-pointer"
      >
        See Detail
      </button>
    </div>
  );
};

export default ArticleCard;
