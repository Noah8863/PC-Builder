import React, { useState, useEffect } from "react";
import { db } from "../../config/firebase";
import { getDocs, collection, addDoc } from "firebase/firestore";

function BlogComponent() {
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");
  const [blogPosts, setBlogPosts] = useState([]);
  const blogCollectionRef = collection(db, "blogPosts");

  //New Blog States
  const [newblog, setNewBlog] = useState("");
  const [newBlogTitle, setNewBlogTitle] = useState("");
  const [newBlogDate, setNewBlogDate] = useState(7162023);

  useEffect(() => {
    const getBlogPost = async () => {
      try {
        const data = await getDocs(blogCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setBlogPosts(filteredData);
        console.log(filteredData);
      } catch (err) {
        console.error(err);
      }
    };
    getBlogPost();
  }, []);

  const submitBlogPost = async () => {
    try {
      await addDoc(blogCollectionRef, {
        title: newBlogTitle,
        post: newblog,
        date: newBlogDate,
      });
    } catch (err) {
      console.error(err);
    }
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
           
           
            className="border border-gray-300 rounded-md p-2 w-full text-black"
            
            onChange={(e) => setNewBlogTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="post" className="block text-gray-700 font-bold">
            Post:
          </label>
          <textarea
           
            className="border border-gray-300 rounded-md p-2 w-full h-40"
            
            onChange={(e) => setNewBlog(e.target.value)}
          ></textarea>
        </div>
        <button
          onClick={submitBlogPost}
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
            <p className="text-gray-600">{post.date}</p>
            <h3 className="text-lg font-bold">{post.title}</h3>
            <p className="mb-2">{post.post}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default BlogComponent;
