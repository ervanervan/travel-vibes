import axios from "axios";
import { Article } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Interface untuk parameter query
interface ArticleQueryParams {
  page?: number;
  pageSize?: number;
  filters?: {
    title?: {
      $eqi?: string; // Case-insensitive match
    };
    category?: {
      name?: {
        $eqi?: string; // Case-insensitive match
      };
    };
  };
}

// Fetch all articles dengan query params
export const getArticles = async (
  queryParams?: ArticleQueryParams
): Promise<Article[]> => {
  try {
    const params: any = {};

    // Set pagination
    if (queryParams?.page) params["pagination[page]"] = queryParams.page;
    if (queryParams?.pageSize)
      params["pagination[pageSize]"] = queryParams.pageSize;

    // Set filters
    if (queryParams?.filters) {
      if (queryParams.filters.title?.$eqi) {
        params["filters[title][$eqi]"] = queryParams.filters.title.$eqi;
      }
      if (queryParams.filters.category?.name?.$eqi) {
        params["filters[category][name][$eqi]"] =
          queryParams.filters.category.name.$eqi;
      }
    }

    const response = await axios.get(`${API_BASE_URL}/articles?populate=*`, {
      params,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
      },
    });

    return response.data.data; // Ambil array dari properti "data"
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error; // Lemparkan error untuk ditangani di komponen
  }
};

// Fetch all articles tanpa filter user di query params
export const getArticlesByUser = async (
  queryParams?: ArticleQueryParams
): Promise<Article[]> => {
  try {
    const params: any = {};

    // Set pagination
    if (queryParams?.page) params["pagination[page]"] = queryParams.page;
    if (queryParams?.pageSize)
      params["pagination[pageSize]"] = queryParams.pageSize;

    // Set filters
    if (queryParams?.filters) {
      if (queryParams.filters.title?.$eqi) {
        params["filters[title][$eqi]"] = queryParams.filters.title.$eqi;
      }
      if (queryParams.filters.category?.name?.$eqi) {
        params["filters[category][name][$eqi]"] =
          queryParams.filters.category.name.$eqi;
      }
    }

    const response = await axios.get(`${API_BASE_URL}/articles?populate=*`, {
      params,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
      },
    });

    // Ambil user ID dari localStorage
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user.documentId) {
      throw new Error("User ID not found in localStorage");
    }

    // Filter articles by user.id di sisi TypeScript
    const filteredArticles = response.data.data.filter(
      (article: Article) => article.user?.documentId === user.documentId
    );
    console.log(filteredArticles);
    return filteredArticles;
  } catch (error) {
    console.error("Error fetching articles by user:", error);
    throw error; // Lemparkan error untuk ditangani di komponen
  }
};

// Fetch a single article by ID
export const getArticleById = async (
  id: string,
  token: string
): Promise<Article> => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/articles/${id}?populate=*`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Sertakan token dalam header
        },
      }
    );
    return response.data.data; // Ambil data dari properti "data"
  } catch (error) {
    console.error("Error fetching article by ID:", error);
    throw error; // Lemparkan error untuk ditangani di komponen
  }
};

// Create a new article
export const createArticle = async (
  article: Article,
  token: string // Token untuk autentikasi
) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/articles`,
      {
        title: article.title,
        description: article.description,
        cover_image_url: article.cover_image_url,
        category: article.category,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Sertakan token dalam header
        },
      }
    );
    return response.data; // Mengembalikan data dari API
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error creating article:", error.response?.data);
      throw new Error(error.response?.data.message || "Error creating article");
    } else {
      throw new Error("Unknown error");
    }
  }
};
