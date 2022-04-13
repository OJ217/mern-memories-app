/** @format */
import axios from "axios";

const API_URL = "/api/posts/";

// Get posts
const getPosts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get post by ID
const getPost = async (id) => {
  const response = await axios.get(`${API_URL}${id}`);
  return response.data;
};

// Create new post
const createPost = async (postData) => {
  const response = await axios.post(API_URL, postData);
  return response.data;
};

// Update post by ID
const updatePost = async (id, updatedPostData) => {
  const response = await axios.put(`${API_URL}${id}`, updatedPostData);
  return response.data;
};

// Delete post by ID
const deletePost = async (id) => {
  const response = await axios.delete(`${API_URL}${id}`);
  return response.data;
};

const postService = {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
};

export default postService;
