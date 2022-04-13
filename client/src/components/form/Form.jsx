/** @format */

import { useState } from "react";
import { uploadImage } from "../../utilities/ImageUpload";
import { RiCloseCircleFill } from "react-icons/ri";

export const PostForm = ({ post, setPost, initialState, submitActions, type = "create" }) => {
  const [tagInput, setTagInput] = useState("");

  // Input Change
  function handleInputChange(e) {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  }

  // Tags - handle add, remove, input change
  function handleAddTag(e) {
    if (tagInput.trim() !== "" && e.code === "Space") {
      setPost({ ...post, tags: [...post.tags, tagInput.trim()] });
      setTagInput("");
    }
  }

  function handleRemoveTag(index) {
    const filteredArray = post.tags.filter((_, i) => {
      return i !== index;
    });
    setPost({ ...post, tags: filteredArray });
  }

  function handleTagInputChange(e) {
    setTagInput(e.target.value);
  }

  // Image Upload
  function handleImageUpload(e) {
    uploadImage(e)
      .then((selectedFile) => {
        setPost({ ...post, selectedFile: selectedFile });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Clear Inputs
  function handleReset() {
    setPost(initialState);
    setTagInput("");
  }

  // Form Submit
  function handleSubmit(e) {
    e.preventDefault();
    submitActions();
  }

  // Prevent Form From Submitting when Enter is PRESSED IN AN INPUT
  function handleKeyPress(e) {
    e.key === "Enter" && e.preventDefault();
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-semibold">
        {type === "update" ? "Update memory" : "Create new memory"}
      </h1>
      <form
        className="mt-4 bg-white p-4 rounded-xl shadow-xl max-w-xl w-full"
        onSubmit={handleSubmit}
      >
        {/* Inputs */}
        <section className="space-y-4">
          <input
            name="creator"
            type="text"
            placeholder="Creator"
            className="w-full text-xl p-2 rounded-md font-medium bg-[#f7f8fc] shadow-md"
            spellCheck="false"
            autoComplete="off"
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            value={post?.creator}
          />
          <input
            name="title"
            type="text"
            placeholder="Title"
            className="w-full text-xl p-2 rounded-md font-medium bg-[#f7f8fc] shadow-md"
            spellCheck="false"
            autoComplete="off"
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            value={post?.title}
          />
          <textarea
            name="description"
            type="text"
            placeholder="Description"
            className="w-full min-h-[150px] text-xl p-2 rounded-md font-medium bg-[#f7f8fc] shadow-md resize-none"
            spellCheck="false"
            autoComplete="off"
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            value={post?.description}
          />
          {/* Tags Input */}
          <div className="w-full text-xl p-2 rounded-md font-medium bg-[#f7f8fc] shadow-md flex items-center flex-wrap gap-2">
            {post?.tags?.map((tag, index) => {
              return (
                <span
                  key={index}
                  className="flex items-center gap-1 bg-white py-1 px-2 rounded-md shadow-md"
                >
                  {tag}{" "}
                  <RiCloseCircleFill
                    className="cursor-pointer"
                    onClick={() => {
                      handleRemoveTag(index);
                    }}
                  />
                </span>
              );
            })}
            <input
              name="tags"
              type="text"
              placeholder="Please press space to add a tag"
              className="bg-transparent w-full"
              spellCheck="false"
              autoComplete="off"
              onChange={handleTagInputChange}
              onKeyUp={handleAddTag}
              onKeyDown={handleKeyPress}
              value={tagInput}
            />
          </div>

          {/* File Input */}
          <div>
            <input type="file" id="FileBase64" className="hidden" onChange={handleImageUpload} />
            <label htmlFor="FileBase64" className="flex font-medium items-center gap-4">
              {/* Button */}
              <div className="p-2 rounded-md bg-[#2FAAD5] cursor-pointer">
                <p className="text-white line-clamp-1">Select an image</p>
              </div>
              {/* Tag */}
              {post?.selectedFile ? (
                <img src={post?.selectedFile} className="h-8 rounded-sm" alt="" />
              ) : (
                <p className="line-clamp-1 cursor-pointer">No image chosen</p>
              )}
            </label>
          </div>
        </section>

        <hr className="border border-gray-300 rounded-md my-8" />

        {/* Submit and Clear */}
        <section className="space-y-4 text-xl text-white">
          <button type="submit" className="block p-2 rounded-md bg-[#2FAAD5] font-medium w-full">
            {type === "update" ? "Update" : "Create"}
          </button>
          <button
            type="button"
            className="block p-2 rounded-md bg-[#FB7284] font-medium w-full"
            onClick={handleReset}
          >
            {type === "update" ? "Change to original" : "Clear"}
          </button>
        </section>
      </form>
    </div>
  );
};
