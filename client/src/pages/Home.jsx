/** @format */

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, reset } from "../features/posts/postSlice";
import { HomeCard } from "../components/card/Card";
import Spinner from "../components/utilities/Spinner";

export default function Home() {
  const dispatch = useDispatch();

  const { posts, isLoading } = useSelector((state) => {
    return state.post;
  });

  useEffect(() => {
    dispatch(getPosts());
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  if (isLoading || posts.length == 0) {
    return <Spinner />;
  }

  return (
    <div className="w-full">
      {/* Cards Container */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-content-center">
        {posts?.map((post) => {
          return (
            <HomeCard
              key={post._id}
              id={post._id}
              title={post.title}
              description={post.description}
              creator={post.creator}
              tags={post.tags}
              selectedFile={post.selectedFile}
              likeCount={post.likeCount}
              createdAt={post.createdAt}
            />
          );
        })}
      </div>
    </div>
  );
}
