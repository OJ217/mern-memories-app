/** @format */

import asyncHandler from "express-async-handler";
import Post from "../model/postSchema.js";

// @desc    -  Get all Posts
// @route   -  GET - /api/posts
// @access  -  PUBLIC
export const getPosts = asyncHandler(async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

// @desc    -  Get post by ID
// @route   -  GET - /api/posts/:id
// @access  -  PUBLIC
export const getPost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

// @desc    - Create post
// @route   - POST - /api/posts
// @access  - PRIVATE
export const createPost = asyncHandler(async (req, res) => {
  const post = req.body;

  try {
    const newPost = await Post.create({
      title: post.title,
      description: post.description,
      creator: post.creator,
      tags: post.tags,
      selectedFile: post.selectedFile,
    });
    res.status(201).json(newPost);
  } catch (error) {
    const errors = error.errors;
    const errorMessages = [];
    for (let err in errors) {
      errorMessages.push(errors[err].message);
    }
    res.status(400).json({ message: errorMessages });
  }
});

// @desc   - Update post by ID
// @route  - PUT /api/posts/:id
// access  - PRIVATE
export const updatePost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const updatedPost = await Post.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

// @desc    - Delete post by ID
// @route   - DELETE /api/post/:id
// @access  - PRIVATE
export const deletePost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);
    await post.remove();
    res.status(200).json("Successfully deleted");
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});
