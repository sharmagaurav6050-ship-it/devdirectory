
import apiClient from "./api";

export const getUsers = async () => {
  const response = await apiClient.get("/users");
  return response.data;
};

export const getUserById = async (id) => {
  const response = await apiClient.get(`/users/${id}`);
  return response.data;
};

export const getPostsByUserId = async (id) => {
  const response = await apiClient.get("/posts", {
    params: { userId: id },
  });
  return response.data;
};

export const createPost = async (postData) => {
  const response = await apiClient.post("/posts", postData);
  return response;
};
