import React, { useState, useEffect } from "react";
import { db, auth, storage } from "../../config/firebase";
import {
  getDocs,
  collection,
  addDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function BlogComponent() {
  const [blogPosts, setBlogPosts] = useState([]);
  const blogCollectionRef = collection(db, "blogPosts");

  //New Blog States
  const [newBlog, setNewBlog] = useState("");
  const [newBlogTitle, setNewBlogTitle] = useState("");
  const [newBlogDate, setNewBlogDate] = useState(7162023);

  //File Upload State
  const [fileUpload, setFileUpload] = useState(null);
  const [imageURL, setImageURL] = useState("");

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


  useEffect(() => {
    getBlogPost();
  }, []);

  const submitBlogPost = async () => {
    if (!auth.currentUser) {
      alert("Please sign in");
      console.log("not logged in!");
      return;
    }
    try {
      if (fileUpload) {
        const imageRef = ref(storage, `blogImages/${fileUpload.name}`);
        await uploadBytes(imageRef, fileUpload);
        const downloadURL = await getDownloadURL(imageRef);
        setImageURL(downloadURL);
      }

      await addDoc(blogCollectionRef, {
        title: newBlogTitle,
        post: newBlog,
        date: newBlogDate,
        userId: auth?.currentUser?.uid,
        imageURL: imageURL,
      });
      setNewBlog("");
      setNewBlogTitle("");
      setNewBlogDate(7162023);
      setImageURL("");
      getBlogPost();
    } catch (err) {
      console.error(err);
      alert("There has been an issue, please try again");
    }
  };

  const uploadFile = async () => {
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload);
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
        <input type="file" onChange={(e) => setFileUpload(e.target.files[0])} />
        <button onClick={uploadFile}>Upload File</button>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Blog Posts</h2>
        {blogPosts.map((post, index) => (
          <div
            key={index}
            className="bg-white border border-gray-300 rounded-md p-4 mb-4"
          >
            <p className="text-gray-600">{post.date}</p>

            <h3 className="text-xxl font-bold">{post.title}</h3>
            {/* <input
              className="text-lg"
              placeholder="Edit Title..."
              onChange={(e) => setUpdatedTitle(e.target.value)}
            /> */}
            {/* <button  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" onClick={() => updateBlogTitle(post.id)}>Update Title</button> */}
            {post.imageURL && (
              <img
                src={post.imageURL}
                alt="Blog Post"
                className="my-4 bg-blue-400 w-10 h-20"
              />
            )}

            <p className="mb-2 text-xl">{post.post}</p>
            {/* <input className="text-lg" placeholder="Edit Post..." /> */}
            {/* <button  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Update Post</button> */}
          </div>
        ))}
      </section>
    </div>
  );
}

export default BlogComponent;
