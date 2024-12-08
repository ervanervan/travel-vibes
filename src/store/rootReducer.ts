import { combineReducers } from "redux";
import authReducer from "./features/auth/authSlice";
import articleReducer from "./features/articles/articleSlice";
import uploadReducer from "./features/upload/uploadSlice";
import categoriesReducer from "./features/category/categoriesSlice";

// Gabungkan semua reducers
const rootReducer = combineReducers({
  auth: authReducer,
  articles: articleReducer,
  upload: uploadReducer,
  categories: categoriesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
