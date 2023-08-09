import React from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { db } from "../../config/firebase";

function Reset() {

    const handleSubmit = async(e)=> {
        e.preventDefault()
        const emailVal = e.target.email.value;
        sendPasswordResetEmail(db, emailVal).them(data=> {
            alert("Check your email")
        }).catch(err=> {
            alert(err.code)
        })
    }

  return (
    <section className="bg-gray-900">
      {/* {showAlert && <Alert type="blue" message={loginError} />} */}
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-black">
              Reset Your Password
            </h1>
            <p className="font-medium">Enter in your email to reset your password</p>
            <form className="space-y-4 md:space-y-6" action="#" onSubmit={(e)=>handleSubmit(e)}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm text-black"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Send Email
              </button>
              
            </form>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <a
                  href="/SignUp"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </a>
              </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Reset;
