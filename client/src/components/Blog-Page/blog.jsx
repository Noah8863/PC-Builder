import React, { useState } from "react";
import {db} from "../../config/firebase"

function BlogComponent() {
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");
  const [blogPosts, setBlogPosts] = useState([]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handlePostChange = (e) => {
    setPost(e.target.value);
  };

  const handleCreatePost = () => {
    const newPost = {
      title: title,
      post: post,
      date: new Date().toLocaleString(),
    };

    setBlogPosts([...blogPosts, newPost]);
    setTitle("");
    setPost("");
  };

  return (
    <div className="container mx-auto p-4">
      <section>
        <h2 className="text-2xl font-bold mb-4">Create New Blog Post</h2>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold">
            Title:
          </label>
          <input
            type="text"
            id="title"
            className="border border-gray-300 rounded-md p-2 w-full"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="post" className="block text-gray-700 font-bold">
            Post:
          </label>
          <textarea
            id="post"
            className="border border-gray-300 rounded-md p-2 w-full h-40"
            value={post}
            onChange={handlePostChange}
          ></textarea>
        </div>
        <button
          onClick={handleCreatePost}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Create Post
        </button>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Blog Posts</h2>
        {blogPosts.map((post, index) => (
          <div
            key={index}
            className="bg-white border border-gray-300 rounded-md p-4 mb-4"
          >
            <h3 className="text-lg font-bold">{post.title}</h3>
            <p className="mb-2">{post.post}</p>
            <p className="text-gray-600">{post.date}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default BlogComponent;
