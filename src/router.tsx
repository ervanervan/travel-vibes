import React, { ReactElement } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
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
import Articlelist from "./pages/Articlelist";
import ArticleDetail from "./pages/ArticleDetail";
import ArticlesListByMePage from "./pages/ArticleByMePage";
import AddDataArticlePage from "./pages/AddDataArticlePage";
import EditDataArticlePage from "./pages/EditDataArticlePage";

// Define types for props
interface RouteProps {
  element: ReactElement;
}

// Komponen untuk mengecek autentikasi
const AuthenticatedRoute: React.FC<RouteProps> = ({ element }) => {
  const token = localStorage.getItem("token");
  return token ? element : <Navigate to="/login" replace />;
};

const UnauthenticatedRoute: React.FC<RouteProps> = ({ element }) => {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/dashboard" replace /> : element;
};

// Router configuration
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/article-list", element: <Articlelist /> },
      { path: "/articles/:id", element: <ArticleDetail /> },
    ],
  },
  {
    path: "/login",
    element: <UnauthenticatedRoute element={<LoginPage />} />,
  },
  {
    path: "/register",
    element: <UnauthenticatedRoute element={<RegisterPage />} />,
  },
  {
    path: "/profile",
    element: <AuthenticatedRoute element={<ProfilePage />} />,
  },
  {
    path: "/dashboard",
    element: <AuthenticatedRoute element={<DashboardPage />} />,
    children: [
      { index: true, element: <DashboardHome /> },
      {
        path: "articles",
        element: <AuthenticatedRoute element={<ArticlePage />} />,
      },
      {
        path: "articles-user",
        element: <AuthenticatedRoute element={<ArticlesListByMePage />} />,
      },
      {
        path: "articles-user/add-data",
        element: <AuthenticatedRoute element={<AddDataArticlePage />} />,
      },
      {
        path: "articles-user/edit-data/:id",
        element: <AuthenticatedRoute element={<EditDataArticlePage />} />,
      },
      {
        path: "categories",
        element: <AuthenticatedRoute element={<CategoryPage />} />,
      },
      {
        path: "comments",
        element: <AuthenticatedRoute element={<CommentPage />} />,
      },
    ],
  },
]);
