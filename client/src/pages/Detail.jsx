/** @format */

import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getPost, deletePost, reset } from "../features/posts/postSlice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/utilities/Spinner";
import moment from "moment";
import { GrEdit } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";

export default function Detail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { postById, isLoading, isError, actionSuccess } = useSelector((state) => {
    return state.post;
  });

  function handleDelete() {
    dispatch(deletePost(id));
  }

  useEffect(() => {
    dispatch(getPost(id));
    return () => {
      dispatch(reset());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (isError) {
      navigate("/404");
    }
    dispatch(reset());
  }, [isError, dispatch, navigate]);

  useEffect(() => {
    if (actionSuccess) {
      toast.success("Successfully deleted memory.", { autoClose: 10000 });
      navigate("/");
    }

    dispatch(reset());
  }, [actionSuccess, dispatch, navigate]);

  if (isLoading || !postById) {
    return <Spinner />;
  }

  return (
    <div className="bg-white p-4 rounded-xl w-full overflow-hidden shadow-2xl md:grid grid-cols-[3fr_2fr] md:gap-6 md:items-center">
      <div>
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-8">
            {postById.tags?.length > 0 && (
              <div className="flex flex-wrap items-center gap-x-1">
                {postById.tags?.map((tag, index) => {
                  return (
                    <p key={index} className="text-gray-500 whitespace-nowrap">
                      #{tag.toString()}
                    </p>
                  );
                })}
              </div>
            )}
            <div className="flex items-center space-x-4">
              <Link to={`/update-memory/${id}`}>
                <GrEdit size={20} />
              </Link>
              <button type="button" onClick={handleDelete}>
                <MdDeleteForever size={24} />
              </button>
            </div>
          </div>
          <h1 className="text-3xl font-semibold">{postById.title}</h1>
        </div>
        <div className="space-y-2 mt-4">
          <img
            src={postById.selectedFile}
            alt=""
            className="aspect-video object-cover object-center rounded-md md:hidden"
          />
          <p className="text-xl text-gray-500">{postById.description}</p>
          <p className="text-xl font-semibold">Created by {postById.creator}</p>
          <p className="text-xl text-gray-500">{moment(postById.createdAt).fromNow()}</p>
        </div>
      </div>
      <img
        src={postById.selectedFile}
        alt=""
        className="overflow-hidden aspect-video object-cover object-center rounded-md hidden md:block"
      />
    </div>
  );
}
