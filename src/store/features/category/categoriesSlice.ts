import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getCategories } from "../../../services/categoryService";

export interface Category {
  id: string;
  name: string;
  description?: string;
}

interface CategoriesState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoriesState = {
  categories: [],
  loading: false,
  error: null,
};

// Async Thunk untuk Fetch Categories
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, thunkAPI) => {
    try {
      const categories = await getCategories();
      // Map response data sesuai format Category
      return categories;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to fetch categories"
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
      state.loading = false;
      state.error = null;
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
      .addCase(
        fetchCategories.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload as string;
        }
      );
  },
});

export const { resetCategories } = categoriesSlice.actions;
export const selectCategories = (state: any) => state.categories; // Selector untuk mengambil state categories
export default categoriesSlice.reducer;
