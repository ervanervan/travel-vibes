import api from "./api";

export const getArticles = (params?: Record<string, any>) => {
  return api.get("/articles", { params });
};

export const getArticleById = (id: string) => {
  return api.get(`/articles/${id}`);
};

export const createArticle = (data: any) => {
  return api.post("/articles", { data });
};

export const updateArticle = (id: string, data: any) => {
  return api.put(`/articles/${id}`, { data });
};

export const deleteArticle = (id: string) => {
  return api.delete(`/articles/${id}`);
};
