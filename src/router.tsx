import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import DashboardHome from "./pages/Dashboardhome";
import DashboardPage from "./pages/Dashboardpage";
import CategoryPage from "./pages/Categorypage";
import CommentPage from "./pages/CommentPage";
import RegisterPage from "./pages/Registerpage";
import ProfilePage from "./pages/Profilepage";
import ArticlePage from "./pages/Articlepage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{ path: "/", element: <HomePage /> }],
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/profile", element: <ProfilePage /> },
  {
    path: "/dashboard",
    element: <DashboardPage />,
    children: [
      { index: true, element: <DashboardHome /> },
      { path: "articles", element: <ArticlePage /> },
      { path: "categories", element: <CategoryPage /> },
      { path: "comments", element: <CommentPage /> },
    ],
  },
]);
