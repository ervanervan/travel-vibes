import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  fetchCategories,
  fetchCategoryById,
  selectCategories,
  selectCategory,
} from "../store/features/category/categoriesSlice";

const CategoryPage = () => {
  const dispatch = useAppDispatch();

  // Ambil state categories
  const { categories, loading, error } = useAppSelector(selectCategories);
  const selectedCategory = useAppSelector(selectCategory);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleSelectCategory = (id: string) => {
    dispatch(fetchCategoryById(id));
  };

  return (
    <section className="p-4">
      <h1 className="text-2xl font-bold mb-4">Category Page</h1>

      {loading && <p>Loading categories...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {!loading && !error && (
        <div>
          {/* Daftar Kategori */}
          <ul className="mb-6">
            {categories.map((category: any) => (
              <li
                key={category.id}
                className="p-2 border-b cursor-pointer hover:bg-gray-100"
                onClick={() => handleSelectCategory(category.id)}
              >
                {category.name}
              </li>
            ))}
          </ul>

          {/* Detail Kategori yang Dipilih */}
          {selectedCategory ? (
            <div className="p-4 border rounded shadow-md">
              <h2 className="text-xl font-bold">{selectedCategory.name}</h2>
              <p>
                {selectedCategory.description || "No description available"}
              </p>
            </div>
          ) : (
            <p>Select a category to see details</p>
          )}
        </div>
      )}
    </section>
  );
};

export default CategoryPage;
