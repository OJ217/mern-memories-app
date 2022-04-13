/** @format */

import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

// Home Page
export const HomeCard = ({
  id,
  title,
  description,
  creator,
  tags = [],
  selectedFile,
  likeCount,
  createdAt,
}) => {
  const [liked, setLiked] = useState(false);

  function handleLike() {
    setLiked(!liked);
  }

  return (
    <div className="rounded-xl overflow-hidden shadow-2xl max-w-[400px] min-w-[200px] flex flex-col">
      <div
        className="aspect-[2/1] bg-cover bg-center bg-no-repeat bg-black bg-opacity-40 bg-blend-darken p-4"
        style={{ backgroundImage: `url(${selectedFile})` }}
      >
        <h1 className="text-xl font-semibold text-white">{creator}</h1>
        <h3 className="text-lg text-white">{moment(createdAt).fromNow()}</h3>
      </div>
      <div className="bg-white p-4 flex flex-col gap-2 flex-grow">
        {tags.length > 0 && (
          <div className="flex items-center gap-1 overflow-scroll">
            {tags?.map((tag) => {
              return <p className="text-gray-500 whitespace-nowrap">#{tag.toString()}</p>;
            })}
          </div>
        )}
        <Link to={`/memories/${id}`}>
          <h1 className="text-2xl font-semibold line-clamp-2">{title}</h1>
        </Link>
        <h3 className="text-xl text-gray-500 line-clamp-3">{description}</h3>
        <div className="flex items-center gap-2">
          <button onClick={handleLike} type="button">
            {liked ? <AiFillLike size={24} /> : <AiOutlineLike size={24} />}
          </button>
          <h2 className="text-gray-500 text-xl font-medium">
            {liked ? likeCount + 1 : likeCount} likes
          </h2>
        </div>
      </div>
    </div>
  );
};
