import React, { useState } from "react";
import {
  auth,
  googleProvider,
  gitHubProvider,
  storage,
} from "../../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import Alert from "../Alerts/alert.jsx";

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
  const [reEnterPassword, setEnterPassword] = useState("");
  const [fileUpload, setFileUpload] = useState(null);

  //Alert and next questions states
  const [showAlert, setShowAlert] = useState(false);
  const [showAdditionalQuestions, setShowAdditionalQuestions] = useState(false);

  const signIn = async () => {
    try {
      if (email && password) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Sign-up successful!"); // Display the alert
        navigate("/Blog");
      } else {
        setShowAlert(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
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
    }
  };

  const areFieldsFilled = () => {
    return firstName && lastName && email && password;
  };

  //Upload profile image logic to firebase
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
    //Component below belongs to flowbite code snippet. See https://flowbite.com/blocks/marketing/register/ for more details
    <section className="bg-gray-900">
      {showAlert && (
        <Alert
          type="blue"
          message="Please fill out both email and password fields."
        />
      )}
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <a
          href="/"
          className="flex items-center mb-6 text-2xl text-center font-semibold text-white"
        >
          Join the PC Builder Community!
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl ">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                {!showAdditionalQuestions && (
                  <div>
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                      >
                        First Name
                      </label>
                      <input
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="John"
                        required=""
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                      >
                        Last Name
                      </label>
                      <input
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Smith"
                        required=""
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                      >
                        Email Address
                      </label>
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@company.com"
                        required=""
                      />
                    </div>

                    <button
                      onClick={handleNext}
                      className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
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
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        required=""
                      >
                        Password
                      </label>
                      <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="reEnterPassword"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        required=""
                      >
                        Re-Enter Password
                      </label>
                      <input
                        
                        type="password"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>

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

                {showAdditionalQuestions && (
                  <button
                    type="submit"
                    onClick={signIn}
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    disabled={!areFieldsFilled()}
                  >
                    Create an account
                  </button>
                )}
              </div>

              <button
                type="submit"
                onClick={signInWithGoogle}
                className="flex items-center justify-center w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                <span>Sign In With Google</span>
                <img className="w-6 ml-4" src={googleIcon} alt="Google Icon" />
              </button>
              {/* <button
                type="submit"
                onClick={signInWithGitHub}
                className="flex items-center justify-center w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                <span>Sign In With GitHub</span>
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
