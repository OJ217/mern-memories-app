/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postService from "./postService";

// Get Posts
export const getPosts = createAsyncThunk("posts/get", async (_, thunkAPI) => {
  try {
    return await postService.getPosts();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Get Post by ID
export const getPost = createAsyncThunk("posts:id/get", async (id, thunkAPI) => {
  try {
    return await postService.getPost(id);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Create NEW POST
export const createPost = createAsyncThunk("posts/post", async (postData, thunkAPI) => {
  try {
    return await postService.createPost(postData);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Update Post by ID
export const updatePost = createAsyncThunk("posts:id/put", async (updatedPost, thunkAPI) => {
  try {
    return await postService.updatePost(updatedPost.id, updatedPost.postData);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Delete Post by ID
export const deletePost = createAsyncThunk("posts:id/delete", async (id, thunkAPI) => {
  try {
    return await postService.deletePost(id);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const initialState = {
  posts: [],
  postById: null,
  isError: false,
  fetchSuccess: false,
  actionSuccess: false,
  isLoading: false,
  message: "",
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.fetchSuccess = true;
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.fetchSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.fetchSuccess = true;
        state.postById = action.payload;
      })
      .addCase(getPost.rejected, (state, action) => {
        state.isLoading = false;
        state.fetchSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.actionSuccess = true;
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.actionSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updatePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.actionSuccess = true;
        state.postById = action.payload;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.isLoading = false;
        state.actionSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePost.fulfilled, (state) => {
        state.isLoading = false;
        state.actionSuccess = true;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.actionSuccess = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = postSlice.actions;
export default postSlice.reducer;
