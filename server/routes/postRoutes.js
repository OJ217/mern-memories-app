/** @format */

import express from "express";
export const router = express.Router();

import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} from "../controller/postController.js";

router.route("/").get(getPosts).post(createPost);
router.route("/:id").get(getPost).put(updatePost).delete(deletePost);
