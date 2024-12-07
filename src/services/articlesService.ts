import { Article } from "../types";
import api from "./api";

export const getArticles = async (): Promise<Article[]> => {
  try {
    const response = await api.get("/articles");
    return response.data.data; // Ambil array dari properti "data"
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw new Error("Failed to fetch articles");
  }
};
