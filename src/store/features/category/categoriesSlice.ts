import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  getCategories,
  getCategoryById,
} from "../../../services/categoryService";
import { RootState } from "../../store";

export interface Category {
  id: string;
  name: string;
  description?: string;
}

interface CategoriesState {
  categories: Category[];
  category: Category | null;
  loading: boolean;
  error: string | null;
}

const initialState: CategoriesState = {
  categories: [],
  category: null,
  loading: false,
  error: null,
};

// Async Thunk untuk Fetch Categories
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, thunkAPI) => {
    try {
      const categories = await getCategories();
      return categories;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to fetch categories"
      );
    }
  }
);

// Async Thunk untuk Fetch Category by ID
export const fetchCategoryById = createAsyncThunk(
  "categories/fetchCategoryById",
  async (id: string, thunkAPI) => {
    try {
      const category = await getCategoryById(id);
      return category;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to fetch category by ID"
      );
    }
  }
);

// Slice untuk Categories
const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    resetCategories: (state) => {
      state.categories = [];
      state.category = null;
      state.loading = false;
      state.error = null;
    },
    resetCategory: (state) => {
      state.category = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCategories.fulfilled,
        (state, action: PayloadAction<Category[]>) => {
          state.loading = false;
          state.categories = action.payload;
        }
      )
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch categories";
      })

      .addCase(fetchCategoryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCategoryById.fulfilled,
        (state, action: PayloadAction<Category>) => {
          state.loading = false;
          state.category = action.payload;
        }
      )
      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch category by ID";
      });
  },
});

export const selectCategories = (state: RootState) => state.categories; // Ekspor named
export const selectCategory = (state: RootState) => state.categories.category; // Ekspor named
export const { resetCategories, resetCategory } = categoriesSlice.actions; // Ekspor named

export default categoriesSlice.reducer; // Ekspor default (jika ada)
