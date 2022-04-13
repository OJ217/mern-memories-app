/** @format */

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost, reset } from "../features/posts/postSlice";
import { PostForm } from "../components/form/Form";
import { toast } from "react-toastify";

export default function Create() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isError, actionSuccess, message } = useSelector((state) => {
    return state.post;
  });

  const initialState = {
    creator: "",
    title: "",
    description: "",
    tags: [],
    selectedFile: "",
  };

  const [newPost, setNewPost] = useState(initialState);

  function submitActions() {
    dispatch(createPost(newPost));
  }

  useEffect(() => {
    if (isError) {
      message.forEach((m) => toast.error(m));
    }

    if (actionSuccess) {
      toast.success("Successfully created new memory.", { autoClose: 10000 });
      navigate("/");
    }

    dispatch(reset());
  }, [isError, actionSuccess, message, dispatch]);

  return (
    <PostForm
      post={newPost}
      setPost={setNewPost}
      submitActions={submitActions}
      initialState={initialState}
    />
  );
}
