import { Link } from "react-router-dom";
import { WithArticles } from "../types";
export interface ArticleTableProps extends WithArticles {}

const ArticleTable: React.FC<WithArticles> = ({ articles }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 table-auto">
        <thead className="border-b">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-r">
              ID
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-r">
              Title
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-r">
              Description
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-r whitespace-nowrap">
              Cover Image
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-r whitespace-nowrap">
              Category
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-r whitespace-nowrap">
              Author
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article, index) => (
            <tr key={article.id} className="border-b tracking-tighter">
              <td className="px-4 py-2 text-sm text-gray-700 border-r">
                {index + 1}
              </td>
              <td className="px-4 py-2 text-sm text-gray-700 border-r">
                {article.title || "-"}
              </td>
              <td className="px-4 py-2 text-sm text-gray-700 border-r">
                {article.description || "-"}
              </td>
              <td className="px-4 py-2 text-sm text-gray-700 border-r">
                {article.cover_image_url ? (
                  <img
                    src={article.cover_image_url}
                    alt={article.title}
                    className="h-16 w-16 object-cover rounded mx-auto"
                  />
                ) : (
                  "No Image"
                )}
              </td>
              <td className="px-4 py-2 text-sm text-gray-700 border-r">
                {article.category?.name || "-"}
              </td>
              <td className="px-4 py-2 text-sm text-gray-700 border-r">
                {article.user?.email || "-"}
              </td>
              <td className="flex flex-col md:flex-row gap-2 items-center justify-center px-4 py-2 text-sm text-gray-700">
                <Link
                  to={`/articles/${article.documentId}`}
                  className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ArticleTable;
