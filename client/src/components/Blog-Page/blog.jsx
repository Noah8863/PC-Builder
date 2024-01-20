import React, { useState, useEffect } from "react";
import { db, auth, storage } from "../../config/firebase";
import { getDocs, collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import stockImage from "../../images/blog.png"

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
        date: currentDate,
        userId: auth?.currentUser?.uid,
        imageURL: imageURL,
      });
      setNewBlog("");
      setNewBlogTitle("");
      setNewBlogDate(currentDate);
      setImageURL("");
      getBlogPost();
      window.location.reload(false);
    } catch (err) {
      console.error(err);
      alert("There has been an issue, please try again");
    }
  };

  const lineHeightUsername = {
    lineHeight:"3.75rem"
  }
  
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
        <button
          onClick={submitBlogPost}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-1/5 justify-center flex m-auto"
        >
          Create Post
        </button>
      </section>

      <section className="mt-8 mx-20">
        <h2 className="text-2xl font-bold mb-4">Blog Posts</h2>

        {blogPosts.map((post, index) => (
          <div
            key={index}
            className="bg-white border border-gray-300 rounded-md mb-4 grid grid-cols-5"
          >
            <div className="col-span-1">
              <img className="" src={stockImage}></img>
            </div>
            <div className="col-span-4">
            <p className="text-gray-600 py-2">{post.date}</p>
            <h3 className="text-xxl font-bold mb-2">{post.title}</h3>
            <p className="mb-2 text-lg text-gray-500">{post.post}</p>

            <span className="mb-1 mt-2 top-8 relative">Kate Horwitz</span>

            {/* <div style={lineHeightUsername} className="inline-block rounded-full bg-blue-400 pr-5 h-16">
              
              <img
                className="rounded-full float-left h-full"
                src="https://images.unsplash.com/photo-1548544149-4835e62ee5b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
               />
                {" "}
                <span class="ml-4">Kate Horwitz</span>
              
            </div> */}

            
            {/* {post.imageURL && (
              <img
                src={post.imageURL}
                alt="Blog Post"
                className="my-4 bg-blue-400 w-10 h-20"
              />
            )} */}

          </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default BlogComponent;
