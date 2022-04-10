/** @format */

import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add title"],
  },
  description: {
    type: String,
    required: [true, "Please add description"],
  },
  creator: {
    type: String,
    required: [true, "Creator is required"],
  },
  tags: [String],
  selectedFile: {
    type: String,
    required: [true, "Image is required"],
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: String,
    default: new Date(),
  },
});

const Post = mongoose.model("Post", postSchema);

export default Post;
