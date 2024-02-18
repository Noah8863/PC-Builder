import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { db, auth } from "../../config/firebase";
import {
  getDocs,
  collection,
  query,
  where,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from "@mui/icons-material/Logout";
import BuildImg from "../../images/custom-PC-3.jpg";
import buildImgage from "../../images/pc-building.jpg";
import stockImg from "../../images/blog.png";
import sadComputerIcon from "../../images/sadComputerIcon.png";
import placeHolder from "../../images/profile.png"

import "./styles.css";

function AccountComponent() {
  const location = useLocation();
  const userData = location.state;
  const [currentUser, setCurrentUser] = useState(null);
  const [blogPosts, setBlogPosts] = useState(false);
  const [showProfile, setShowProfile] = useState(true);
  const [showBuilds, setShowBuilds] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [userBlogPosts, setUserBlogPosts] = useState([]);
  const [buildContainers, setBuildContainers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  //Update states;
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");

  useEffect(() => {
    // Simulate loading and error for demonstration
    setTimeout(() => {
      setLoading(false);
      setError(true);
    }, 2000);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        fetchUserBlogPosts();
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  //Fetching Build Containers
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const querySnapshot = await getDocs(collection(db, "builds"));
  //       const buildsData = querySnapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));
  //       setBuildContainers(buildsData);
  //       console.log(buildsData);
  //     } catch (error) {
  //       console.error("Error fetching build containers: ", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const fetchUserBlogPosts = async () => {
    try {
      const user = auth.currentUser; // Get the currently logged-in user
      if (!user) {
        console.log("No user logged in.");
        return;
      }
      const blogCollectionRef = collection(db, "blogPosts"); // Assuming your collection is named "blogPosts"
      // Create a query to filter by the user's UID
      const q = query(blogCollectionRef, where("userId", "==", user.uid));
      const data = await getDocs(q);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      // Update the blogPosts state based on whether there are blog posts or not
      if (filteredData.length > 0) {
        setBlogPosts(true); // User has blog posts, set to true
      } else {
        setBlogPosts(false); // User doesn't have any blog posts, set to false
      }

      setUserBlogPosts(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  function ShowAccount() {
    setShowProfile(true);
    setShowBuilds(false);
  }

  function ShowBuilds() {
    setShowProfile(false);
    setShowBuilds(true);
  }

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const createBuild = async () => {
    const buildName = document.getElementById("buildName").value;
    const buildDescription = document.getElementById("buildDescription").value;
    const buildType = document.getElementById("buildType").value;
    const uniqueID = Date.now();
    const newBuildContainer = {
      id: uniqueID,
      name: buildName,
      description: buildDescription,
      type: buildType,
    };

    setBuildContainers((prevContainers) => [
      ...prevContainers,
      newBuildContainer,
    ]);

    setShowPopup(false);
  };

  const openEditPopup = (post) => {
    setUpdatedTitle(post.title);
    setUpdatedDescription(post.post);
    setShowEditPopup(true);
  };

  const closeEditPopup = () => {
    setShowEditPopup(false);
  };

  function formatDate(dateString) {
    const dateObject = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return dateObject.toLocaleDateString(undefined, options);
  }

  //Delete blog post
  const deleteBlog = async (id) => {
    const blogDoc = doc(db, "blogPosts", id);
    await deleteDoc(blogDoc);
    window.location.reload(false);
  };

  const updateBlogTitle = async (id) => {
    const blogDoc = doc(db, "blogPosts", id);
    await updateDoc(blogDoc, { title: updatedTitle });
    setShowEditPopup(false);
    window.location.reload(false);
  };

  const updateBlogDescription = async (id) => {
    const blogDoc = doc(db, "blogPosts", id);
    await updateDoc(blogDoc, { post: updatedDescription });
    setShowEditPopup(false);
    window.location.reload(false);
  };

  return (
    <div className="container xl:w-3/4 lg:w-full md:w-full sm:w-full mx-auto p-8 m-4">
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-2">
        <div className="grid col-span-1 justify-left p-4 m-4">
          {currentUser ? (
            <div className="bg-blue-500 rounded-lg text-white">
              {/* <img
                className="w-2/3"
                src={currentUser.photoURL ? currentUser.photoURL : BuildImg}
                alt="profilePicture"
              ></img> */}
              <img
                className="rounded-full m-auto mt-8"
                // src={currentUser.photoURL ? currentUser.photoURL : placeHolder}
                src={placeHolder}
                alt="Avatar"
              ></img>
              <p className="text-xxl p-4 text-center">
                {currentUser.displayName}
              </p>
              <div class="flex items-center justify-center">
                <div class="border-2 border-white w-4/5 mt-2 mb-4"></div>
              </div>
              <div className="space-y-2 mx-4 text-xl">
                <button
                  className="w-full flex items-center justify-between"
                  onClick={ShowAccount}
                >
                  <span className="space-between-2">
                    <AccountCircleIcon /> Profile{" "}
                  </span>
                </button>
                <button
                  className="w-full flex items-center justify-between"
                  onClick={ShowBuilds}
                >
                  <span>
                    <SettingsOutlinedIcon /> Builds{" "}
                  </span>
                </button>
              </div>
              <button
                className="flex items-center justify-between relative mt-4 ml-4 text-xl"
                onClick={logOut}
              >
                <span>
                  <LogoutIcon /> Logout{" "}
                </span>
              </button>
            </div>
          ) : (
            <p className="text-xl p-4">Loading</p>
          )}
        </div>
        {currentUser ? (
          <div className="col-span-2 p-4 m-4 rounded-lg bg-blue-500">
            {showProfile && (
              <div className="text-white p-4">
                <p className="text-2xl py-2 text-left">
                  Welcome, {currentUser.displayName}
                </p>
                <p className="mb-2">
                  Member Since: {formatDate(currentUser.metadata.creationTime)}
                </p>
                <div className="border-t border-white py-2"></div>
                <div className="text-lg flex">Email: {currentUser.email}</div>
                <div className="mt-8 h-max">
                  <h2 className="text-xxl mb-4">Your Blog Posts</h2>
                  <div className="text-black">
                    {blogPosts ? (
                      <section className="mt-8">
                        <section className="mt-8">
                          {userBlogPosts.map((post) => (
                            <div
                              key={post.id}
                              className="bg-white mb-4 grid grid-cols-5"
                            >
                              <div className="col-span-1 w-full">
                                <img className="h-full" src={stockImg}></img>
                              </div>
                              <div className="col-span-4 p-4">
                                <h3 className="text-xxl font-bold">
                                  {post.title}
                                </h3>
                                <p className="mb-2 text-xl">{post.post}</p>
                                <div className="flex justify-between items-center">
                                  <button
                                    button
                                    onClick={() => openEditPopup(post)}
                                  >
                                    <span className="ml-2">
                                      Edit Post <EditIcon />{" "}
                                    </span>
                                  </button>
                                  <button
                                    className="bg-red-500 text-white p-2 rounded-md"
                                    onClick={() => deleteBlog(post.id)}
                                  >
                                    <span className="ml-2">
                                      Delete Post <DeleteIcon />{" "}
                                    </span>
                                  </button>
                                </div>
                              </div>
                              {showEditPopup && (
                                <div className="fixed inset-0 flex items-center justify-center z-50">
                                  <div className="p-6 rounded-lg shadow-lg w-2/5 bg-gray-100">
                                    <h2 className="text-xl font-semibold mb-4">
                                      Edit your blog post
                                    </h2>

                                    {/* Input fields */}
                                    <div className="mb-4 w-1/3">
                                      <label htmlFor="buildName">
                                        New Title:
                                      </label>
                                      <input
                                        type="text"
                                        id="buildName"
                                        className="border rounded-md p-2"
                                        value={updatedTitle}
                                        onChange={(e) =>
                                          setUpdatedTitle(e.target.value)
                                        }
                                      />
                                      <button
                                        className="mt-2 px-2 rounded-md bg-blue-400 text-white"
                                        onClick={() => updateBlogTitle(post.id)}
                                      >
                                        Edit Title
                                      </button>
                                    </div>

                                    <div className="mb-4 w-1/3">
                                      <label htmlFor="buildDescription">
                                        New Description:
                                      </label>
                                      <textarea
                                        id="buildDescription"
                                        className="border rounded-md p-2"
                                        value={updatedDescription}
                                        onChange={(e) =>
                                          setUpdatedDescription(e.target.value)
                                        }
                                      ></textarea>
                                      <button
                                        className="mt-2 px-2 rounded-md bg-blue-400 text-white"
                                        onClick={() =>
                                          updateBlogDescription(post.id)
                                        }
                                      >
                                        Edit Blog
                                      </button>
                                    </div>
                                    {/* Close button */}
                                    <div className="text-right">
                                      <button
                                        onClick={closeEditPopup}
                                        className="bg-red-500 text-white p-2 rounded-md"
                                      >
                                        Close
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </section>
                      </section>
                    ) : (
                      <div className="text-center bg-white rounded-xl p-4">
                        <p className="py-4 text-xl text-black">
                          Looks like you haven't created any posts yet. Care to
                          start today?
                        </p>
                        <img
                          className="relative m-auto"
                          src={sadComputerIcon}
                        ></img>
                        <a href="/Blog">
                          <div className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-1/5 justify-center flex m-auto">
                            Blog Page
                          </div>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            {showBuilds && (
              <div className=" p-2 m-2 text-black">
                <p className="text-2xl py-2 text-left">
                  Welcome, {currentUser.displayName}
                </p>
                <p className="mb-2">
                  Member Since: {formatDate(currentUser.metadata.creationTime)}
                </p>
                <div className="border-t border-white py-2"></div>
                <div className="text-lg flex">Email: {currentUser.email}</div>
                <h1 className="text-left text-xxl py-4">Work Station</h1>
                <div className="p-4 justify-center text-center">
                  {buildContainers.length === 0 ? (
                    <>
                      <p className="p-4">
                        It looks like you don't have a build yet, how about
                        creating one?
                      </p>
                      <img
                        className="relative m-auto"
                        src={sadComputerIcon}
                        alt="Sad Computer"
                      ></img>
                    </>
                  ) : (
                    // Render build containers dynamically
                    buildContainers.map((build) => (
                      <div
                        key={build.id}
                        className="border p-4 mt-4 rounded-md"
                      >
                        <h3> Name: {build.name}</h3>
                        <p>Build: {build.description}</p>
                        <p>Type: {build.type}</p> 
                      </div>
                    ))
                  )}
                  <button onClick={openPopup}>
                        <span className="ml-2">
                          Add a Build <ControlPointIcon />{" "}
                        </span>
                      </button>
                </div>
                

                {showPopup && (
                  <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className=" p-6 rounded-lg shadow-lg w-2/5 bg-gray-100">
                      <h2 className="text-xl font-semibold mb-4">
                        Add a Build
                      </h2>

                      {/* Input fields */}
                      <div className="mb-4 w-1/3">
                        <label htmlFor="buildName">Build Name:</label>
                        <input
                          type="text"
                          id="buildName"
                          className="border rounded-md p-2 mt-2"
                        />
                      </div>

                      <div className="mb-4 w-1/3">
                        <label htmlFor="buildDescription">
                          Build Description:
                        </label>
                        <textarea
                          id="buildDescription"
                          className="border rounded-md p-2 mt-2"
                        ></textarea>
                      </div>

                      <label htmlFor="buildType">Build Type:</label>
                      <div className="mt-2 mb-4">
                        <select
                          id="buildType"
                          className="border rounded-md p-2 w-1/3 text-center"
                        >
                          <option value="Shopping List">Shopping List</option>
                          <option value="Wish List">Wish List</option>
                          <option value="Current Set Up">Current Set Up</option>
                        </select>
                      </div>

                      {/* Close button */}
                      <div className="flex justify-between">
                        <button
                          onClick={createBuild}
                          className="px-2 rounded-md bg-blue-400 text-white"
                        >
                          Create Build
                        </button>
                        <button
                          onClick={closePopup}
                          className="bg-red-500 text-white p-2 rounded-md"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div>
            <div className="errorContainer">
              <div className="compcontainer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 90.5 74.769"
                >
                  <path
                    fill="#C7CCDB"
                    d="M58.073 74.769H32.426l6.412-19.236h12.824"
                  />
                  <path
                    fill="#373F45"
                    d="M90.5 52.063c0 1.917-2.025 3.471-4.525 3.471H4.525C2.025 55.534 0 53.98 0 52.063V3.471C0 1.554 2.026 0 4.525 0h81.449c2.5 0 4.525 1.554 4.525 3.471v48.592"
                  />
                  <path
                    fill="#F1F2F2"
                    d="M84.586 46.889c0 1.509-1.762 2.731-3.936 2.731H9.846c-2.172 0-3.933-1.223-3.933-2.731V8.646c0-1.508 1.761-2.732 3.933-2.732H80.65c2.174 0 3.936 1.225 3.936 2.732v38.243"
                  />
                  <path
                    fill="#A2A7A5"
                    d="M16.426 5.913L8.051 23h13l-6.875 12.384L26.75 46.259l-8.375-11.375L26.75 20H14.625l6.801-14.087zM68.551 49.62l-8.375-17.087h13l-6.875-12.384L78.875 9.274 70.5 20.649l8.375 14.884H66.75l6.801 14.087z"
                  />
                </svg>
              </div>
              <h1 className="header">Account ERROR</h1>
              <div className="instructions">
                <h2 className="mb-4">
                  Sorry, something went wrong on our end.
                </h2>
                <p>In the meantime, you can:</p>
                <div className="step">
                  <svg
                    className="icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 489.711 489.711"
                  >
                    <path d="M112.156,97.111c72.3-65.4,180.5-66.4,253.8-6.7l-58.1,2.2c-7.5,0.3-13.3,6.5-13,14c0.3,7.3,6.3,13,13.5,13    c0.2,0,0.3,0,0.5,0l89.2-3.3c7.3-0.3,13-6.2,13-13.5v-1c0-0.2,0-0.3,0-0.5v-0.1l0,0l-3.3-88.2c-0.3-7.5-6.6-13.3-14-13    c-7.5,0.3-13.3,6.5-13,14l2.1,55.3c-36.3-29.7-81-46.9-128.8-49.3c-59.2-3-116.1,17.3-160-57.1c-60.4,54.7-86,137.9-66.8,217.1    c1.5,6.2,7,10.3,13.1,10.3c1.1,0,2.1-0.1,3.2-0.4c7.2-1.8,11.7-9.1,9.9-16.3C36.656,218.211,59.056,145.111,112.156,97.111z"></path>
                    <path d="M462.456,195.511c-1.8-7.2-9.1-11.7-16.3-9.9c-7.2,1.8-11.7,9.1-9.9,16.3c16.9,69.6-5.6,142.7-58.7,190.7    c-37.3,33.7-84.1,50.3-130.7,50.3c-44.5,0-88.9-15.1-124.7-44.9l58.8-5.3c7.4-0.7,12.9-7.2,12.2-14.7s-7.2-12.9-14.7-12.2l-88.9,8    c-7.4,0.7-12.9-7.2-12.2-14.7l8-88.9c0.6,7,6.5,12.3,13.4,12.3c0.4,0,0.8,0,1.2-0.1c7.4-0.7,12.9-7.2,12.2-14.7l-4.8-54.1    c36.3,29.4,80.8,46.5,128.3,48.9c3.8,0.2,7.6,0.3,11.3,0.3c55.1,0,107.5-20.2,148.7-57.4    C456.056,357.911,481.656,274.811,462.456,195.511z"></path>
                  </svg>
                  <p>Refresh the page</p>
                </div>
                <div className="step">
                  <svg
                    className="icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 60 60"
                  >
                    <path d="M30,0C13.458,0,0,13.458,0,30s13.458,30,30,30s30-13.458,30-30S46.542,0,30,0z M30,58C14.561,58,2,45.439,2,30   S14.561,2,30,2s28,12.561,28,28S45.439,58,30,58z"></path>
                    <path d="M30,6c-0.552,0-1,0.447-1,1v23H14c-0.552,0-1,0.447-1,1s0.448,1,1,1h16c0.552,0,1-0.447,1-1V7C31,6.447,30.552,6,30,6z"></path>
                  </svg>
                  <p>Wait a few minutes</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AccountComponent;
