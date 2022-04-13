/** @format */

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPost, updatePost, reset } from "../features/posts/postSlice";
import { PostForm } from "../components/form/Form";
import Spinner from "../components/utilities/Spinner";
import { toast } from "react-toastify";

export default function Update() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const initialState = {
    creator: "",
    title: "",
    description: "",
    tags: [],
    selectedFile: "",
  };

  const [updatedPost, setUpdatedPost] = useState(initialState);

  // Redux - Post States
  const { postById, isError, fetchSuccess, actionSuccess, isLoading, message } = useSelector(
    (state) => {
      return state.post;
    }
  );

  // Effect hook for getting post with id
  useEffect(() => {
    dispatch(getPost(id));
    return () => {
      dispatch(reset());
    };
  }, [dispatch, id]);

  // Effect hook for updating updatedPost state when fetched the data
  useEffect(() => {
    if (fetchSuccess) {
      setUpdatedPost(postById);
    }
  }, [postById, fetchSuccess]);

  // Submit Actions
  function submitActions() {
    dispatch(updatePost({ id, postData: updatedPost }));
  }

  useEffect(() => {
    if (isError) {
      message.forEach((m) => toast.error(m));
    }

    if (actionSuccess) {
      toast.success("Successfully updated memory.", { autoClose: 10000 });
      navigate("/");
    }

    dispatch(reset());
  }, [isError, actionSuccess, message, dispatch]);

  if (isLoading || !postById) {
    return <Spinner />;
  }

  return (
    <PostForm
      post={updatedPost}
      setPost={setUpdatedPost}
      initialState={postById}
      submitActions={submitActions}
      type="update"
    />
  );
}
