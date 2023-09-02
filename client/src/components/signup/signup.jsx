import React, { useState } from "react";
import "./signup.css"
import {
  auth,
  googleProvider,
  gitHubProvider,
  storage,
  db,
} from "../../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import Alert from "../Alerts/alert.jsx";
import Modal from "../Modal/index.jsx";

import googleIcon from "../../images/googleIcon.png";
import GitHubIcon from "../../images/GitHubIcon.png";

function SignUp() {
  //navigate to another page after login successful
  const navigate = useNavigate();

  //New account data
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [fileUpload, setFileUpload] = useState(null);

  //Alert and next questions states
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showAdditionalQuestions, setShowAdditionalQuestions] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  //State for Modal dropdown
  const [modalOpen, setModalOpen] = useState(false)

  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true)

  const signIn = async () => {
    try {
      if (email && password) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Sign-up successful!"); // Display the alert
        if (profilePicture) {
          const profileFolderRef = ref(
            storage,
            `profilePictureFiles/${profilePicture.name}`
          );
          await uploadBytes(profileFolderRef, profilePicture);
          const downloadURL = await getDownloadURL(profileFolderRef);

          // Add user data to Firestore
          await db.collection("users").add({
            firstName,
            lastName,
            email,
            profilePictureURL: downloadURL,
          });
        }
        const userData = {
          firstName,
          lastName,
          email,
          password,
        };
        navigate("/Account", { state: userData });
      } else {
        setShowAlert(true);
      }
    } catch (err) {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        // Check for email-already-in-use error
        setErrorMessage("The email address is already in use."); // Set the error message state
      }
      if (err.code === "auth/weak-password") {
        setErrorMessage("Password must be at least 6 characters");
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
      setShowAlert(true); // Show the alert with the error message
    }
  };



  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/Account");
    } catch (err) {
      console.error(err);
    }
  };

  const signInWithGitHub = async () => {
    try {
      await signInWithPopup(auth, gitHubProvider);
    } catch (err) {
      console.error(err);
    }
  };

  //If all input fields are true, show next quetions
  const handleNext = () => {
    if (firstName && lastName && email) {
      setShowAdditionalQuestions(true);
    } else {
      setShowAlert(true);
    }
  };

  // Upload profile image logic to firebase
  const uploadFile = async () => {
    if (!profilePicture) return;
    const profileFolderRef = ref(
      storage,
      `profilePictureFiles/${profilePicture.name}`
    );
    try {
      await uploadBytes(profileFolderRef, profilePicture);
      const downloadURL = await getDownloadURL(profileFolderRef);
      await db.collection("users").add({
        firstName,
        lastName,
        email,
        profilePictureURL: downloadURL,
      });
    } catch (err) {
      console.error(err);
    }
  };

  

  return (
    //Component below belongs to flowbite code snippet. See https://flowbite.com/blocks/marketing/register/ for more details
    <section className="bg-gray-900">
      {showAlert && <Alert type="blue" message={errorMessage} />}
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <a
          href="/"
          className="flex items-center mb-6 text-2xl text-center font-semibold text-white"
        >
          Join the PC Builder Community!
        </a>
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-700 md:text-2xl ">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                {!showAdditionalQuestions && (
                  <div>
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block mb-2 text-sm font-medium text-gray-700 "
                      >
                        First Name
                      </label>
                      <input
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-700 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="John"
                        required=""
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block mb-2 text-sm font-medium text-gray-700  "
                      >
                        Last Name
                      </label>
                      <input
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-700 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="Smith"
                        required=""
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-700"
                      >
                        Email Address
                      </label>
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-700 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-2"
                        placeholder="name@company.com"
                        required=""
                      />
                    </div>

                    <button
                      onClick={handleNext}
                      className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Next
                    </button>
                  </div>
                )}

                {showAdditionalQuestions && (
                  <div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-700 "
                        required=""
                      >
                        Password
                      </label>
                      <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type={showPassword ? "text" : "password"} // Use "text" when showPassword is true, otherwise use "password"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-700 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="reEnterPassword"
                        className="block mb-2 text-sm font-medium text-gray-700"
                        required=""
                      >
                        Re-Enter Password
                      </label>
                      <input
                        type={showPassword ? "text" : "password"} // Use "text" when showPassword is true, otherwise use "password"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-700 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((prevShowPassword) => !prevShowPassword)
                      }
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {showPassword ? "Hide Password" : "Show Password"}
                    </button>

                    {/* Upload profile picture to firebase */}
                    <div className="mt-4 mb-4">
                      <label
                        htmlFor="reEnterPassword"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        required=""
                      >
                        Profile Picture *optional
                      </label>
                      <input
                        type="file"
                        onChange={(e) => setFileUpload(e.target.files[0])}
                      />
                      <button
                        className="w-full mt-4 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        onClick={uploadFile}
                      >
                        Upload Profile Picture
                      </button>
                    </div>
                  </div>
                )}
                <div className="border-2 mb-6"></div>
                {showAdditionalQuestions && (
                  <div>
                  <button
                    type="submit"
                    // onClick={signIn}
                    onClick={() => (modalOpen ? close() : open())}
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Create an account
                  </button>
                  {modalOpen && <Modal modalOpen={modalOpen} handleClose={close} />}
                  </div>
                )}
              </div>

              <button
                type="submit"
                onClick={signInWithGoogle}
                className="flex items-center justify-center w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                <span>Sign Up With Google</span>
                <img className="w-6 ml-4" src={googleIcon} alt="Google Icon" />
              </button>
              {/* <button
                type="submit"
                onClick={signInWithGitHub}
                className="flex items-center justify-center w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                <span>Sign Up With GitHub</span>
                <img className="w-6 ml-4" src={GitHubIcon} alt="Google Icon" />
              </button> */}
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <a
                  href="/Login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
