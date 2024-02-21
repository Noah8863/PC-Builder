import React, { useState, useEffect } from "react";
import { db, auth, storage } from "../../config/firebase";
import { getDocs, collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import stockImage from "../../images/blog.png"
// import { v4 } from 'uuid'

function BlogComponent() {
  const [blogPosts, setBlogPosts] = useState([]);
  const blogCollectionRef = collection(db, "blogPosts");

  //New Blog States
  const [newBlog, setNewBlog] = useState("");
  const [newBlogTitle, setNewBlogTitle] = useState("");
  const [newBlogDate, setNewBlogDate] = useState("");

  //File Upload State
  const [fileUpload, setFileUpload] = useState(null);
  const [imageURL, setImageURL] = useState("");

  const currentDate = new Date().toLocaleDateString();

  const getBlogPost = async () => {
    try {
      const data = await getDocs(blogCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setBlogPosts(filteredData);
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
      if (!setNewBlog == "" || !setNewBlog == ""){
        alert("Please fill out both the title and description")
        return;
      }
      await addDoc(blogCollectionRef, {
        title: newBlogTitle,
        post: newBlog,
        date: currentDate,
        userId: auth?.currentUser?.uid,
        imageURL: imageURL,
      });
      setNewBlog("");
      setNewBlogTitle("");
      setNewBlogDate(currentDate);
      setImageURL("");
      getBlogPost();
    } catch (err) {
      console.error(err);
      alert("There has been an issue, please try again");
    }
  };

  return (
    
    <div className="container mx-auto p-4 bg-gray-200">
      <section>
        <h2 className="text-2xl font-bold mb-4 bg-blue-500 text-white text-center py-2">Create New Blog Post</h2>
        <div className="mx-20 mb-8">
          
          <label htmlFor="title" className="block text-gray-700 font-bold ">
            Title:
          </label>
          <input
            className="border border-gray-300 rounded-md p-2 w-full text-black "
            onChange={(e) => setNewBlogTitle(e.target.value)}
          />
        
        </div>
        <div className="mx-20 mb-8">
          <label htmlFor="post" className="block text-gray-700 font-bold">
            Post:
          </label>
          <textarea
            className="border border-gray-300 rounded-md p-2 w-full h-40"
            onChange={(e) => setNewBlog(e.target.value)}
          ></textarea>
        </div>
        <div className="mx-20 mb-8 text-center">
          <input type="file" />
          {/* <button className="bg-gray-400 p-2 hover:bg-gray-500 text-white" onClick={uploadImage}>Upload Image</button> */}
        </div>
        <button
          onClick={submitBlogPost}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-1/5 justify-center flex m-auto"
        >
          Create Post
        </button>
      </section>

      <section className="mt-8 sm:mx-20 mx-4">
        <h2 className="text-2xl font-bold mb-4">Blog Posts</h2>

        {blogPosts.map((post, index) => (
          <div
            key={index}
            className="bg-white border border-gray-300 rounded-md mb-4 grid md:grid-cols-5 grid-cols-1 h-full"
          >
            <div className="col-span-1">
              <img className="md:w-auto w-full" alt="postImg" src={stockImage}></img>
            </div>
            <div className="col-span-4 pl-4">
            
            <h3 className="text-xxl font-bold my-2">{post.title}</h3>
            <p className="mb-1 mt-2 text-gray-500">Posted by: Kate Horwitz</p>
            <p className="text-blue-400 py-2">{post.date}</p>
            <p className="mb-2 text-lg text-gray-500">{post.post}</p>
          </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default BlogComponent;
