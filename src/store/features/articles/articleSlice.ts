import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import {
  getArticles,
  getArticleById,
  createArticle,
  getArticlesByUser,
} from "../../../services/articlesService";
import { Article } from "../../../types";

// Tipe untuk state
interface ArticlesState {
  articles: Article[];
  currentArticle: Article | null;
  loading: boolean;
  error: string | null;
}

const initialState: ArticlesState = {
  articles: [],
  currentArticle: null,
  loading: false,
  error: null,
};

// Thunk untuk Fetch Semua Articles dengan query params
export const fetchArticles = createAsyncThunk(
  "articles/fetchAll",
  async (
    queryParams?: {
      page?: number;
      pageSize?: number;
      filters?: {
        title?: { $eqi?: string };
        category?: { name?: { $eqi?: string } };
      };
    },
    thunkAPI?
  ) => {
    try {
      const articles = await getArticles(queryParams);
      return articles;
    } catch (error) {
      return thunkAPI?.rejectWithValue("Failed to fetch articles");
    }
  }
);

// Thunk untuk Fetch Semua Articles dengan query params
export const fetchArticlesByUser = createAsyncThunk(
  "articles/fetchAllByUser",
  async (
    queryParams?: {
      page?: number;
      pageSize?: number;
      filters?: {
        title?: { $eqi?: string };
        category?: { name?: { $eqi?: string } };
      };
    },
    thunkAPI?
  ) => {
    try {
      const articles = await getArticlesByUser(queryParams);
      return articles;
    } catch (error) {
      return thunkAPI?.rejectWithValue("Failed to fetch articles");
    }
  }
);

// Thunk untuk Fetch Article berdasarkan ID
export const fetchArticleById = createAsyncThunk(
  "articles/fetchById",
  async ({ id, token }: { id: string; token: string }, thunkAPI) => {
    try {
      const article = await getArticleById(id, token);
      return article;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch article by ID");
    }
  }
);

// Thunk untuk Create Article
export const addArticle = createAsyncThunk(
  "articles/add",
  async ({ article, token }: { article: Article; token: string }, thunkAPI) => {
    try {
      const newArticle = await createArticle(article, token);
      return newArticle;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to create article");
    }
  }
);

// Slice untuk Articles
const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Semua Articles
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchArticles.fulfilled,
        (state, action: PayloadAction<Article[] | undefined>) => {
          state.loading = false;
          state.articles = action.payload || []; // Jika undefined, gunakan array kosong
        }
      )
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch Semua Articles By User
      .addCase(fetchArticlesByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchArticlesByUser.fulfilled,
        (state, action: PayloadAction<Article[] | undefined>) => {
          state.loading = false;
          state.articles = action.payload || []; // Jika undefined, gunakan array kosong
        }
      )
      .addCase(fetchArticlesByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch Article berdasarkan ID
      .addCase(fetchArticleById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchArticleById.fulfilled,
        (state, action: PayloadAction<Article>) => {
          state.loading = false;
          state.currentArticle = action.payload;
        }
      )
      .addCase(fetchArticleById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create Article
      .addCase(addArticle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addArticle.fulfilled,
        (state, action: PayloadAction<Article>) => {
          state.loading = false;
          state.articles.push(action.payload);
        }
      )
      .addCase(addArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectArticles = (state: RootState) => state.articles;
export default articlesSlice.reducer;
