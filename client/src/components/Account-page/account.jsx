import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { auth } from "../../config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ConstructionIcon from "@mui/icons-material/Construction";
import LogoutIcon from "@mui/icons-material/Logout";
import BuildImg from "../../images/custom-PC-3.jpg";
import "./styles.css";

function AccountComponent() {
  const location = useLocation();
  const userData = location.state;
  const [showPassword, setShowPassword] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showProfile, setShowProfile] = useState(true);
  const [showBuilds, setShowBuilds] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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
        console.log(user);
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

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

  return (
    <div className="container xl:w-3/4 lg:w-full md:w-full sm:w-full mx-auto bg-blue-400 p-8 m-4">
      <div className="grid grid-cols-3 gap-6">
        <div className=" h-full grid col-span-1 justify-left p-4 m-4 ">
          {currentUser ? (
            <div>
              <p className="text-2xl p-2 text-left">Account</p>
              <img
                className="w-2/3"
                src={currentUser.photoURL ? currentUser.photoURL : BuildImg}
                alt="profilePicture"
              ></img>
              <p className="text-xl p-4">Welcome, {currentUser.displayName}</p>
              <div className="space-y-2 bg-blue-400">
                <button
                  className="w-full flex items-center justify-between"
                  onClick={ShowAccount}
                >
                  <span className="ml-2">
                    Profile <AccountCircleIcon />{" "}
                  </span>
                </button>
                <button
                  className=" w-full flex items-center justify-between"
                  onClick={ShowBuilds}
                >
                  <span className="ml-2">
                    Builds <ConstructionIcon />{" "}
                  </span>
                </button>
                <button
                  className=" w-full flex items-center justify-between"
                  onClick={logOut}
                >
                  <span className="ml-2">
                    Logout <LogoutIcon />{" "}
                  </span>
                </button>
              </div>
            </div>
          ) : (
            <p className="text-xl p-4"></p>
          )}
        </div>
        {currentUser ? (
          <div className="bg-pink-400 col-span-2 h-full p-4 m-4">
            {showProfile && (
              <div>
                <p className="text-2xl py-2 text-left">
                  {currentUser.displayName}
                </p>
                <div className="border-t border-gray-500 py-2"></div>
                <div className="text-blue-600 text-lg flex">
                  Email: <p className="text-black pl-2">{currentUser.email}</p>
                </div>
                {/* Display other user data here */}
                <button onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? "Hide Password" : "Show Password"}
                </button>
              </div>
            )}
            {showBuilds && (
              <div className="grid grid-cols-2 gap-4">
                <button className="flex flex-col items-center justify-center bg-blue-500 text-white rounded-lg p-4 text-xl">
                  <a href="/PowerSupply">
                    <img
                      src={BuildImg}
                      alt="Power Supply"
                      className="max-w-30 max-h-40"
                    />
                  </a>
                  Build 1
                </button>
                <button className="flex flex-col items-center justify-center bg-blue-500 text-white rounded-lg p-4 text-xl">
                  <a href="/PowerSupply">
                    <img
                      src={BuildImg}
                      alt="Power Supply"
                      className="max-w-30 max-h-40"
                    />
                  </a>
                  Build 2
                </button>
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
                    <path d="M112.156,97.111c72.3-65.4,180.5-66.4,253.8-6.7l-58.1,2.2c-7.5,0.3-13.3,6.5-13,14c0.3,7.3,6.3,13,13.5,13    c0.2,0,0.3,0,0.5,0l89.2-3.3c7.3-0.3,13-6.2,13-13.5v-1c0-0.2,0-0.3,0-0.5v-0.1l0,0l-3.3-88.2c-0.3-7.5-6.6-13.3-14-13    c-7.5,0.3-13.3,6.5-13,14l2.1,55.3c-36.3-29.7-81-46.9-128.8-49.3c-59.2-3-116.1,17.3-160,57.1c-60.4,54.7-86,137.9-66.8,217.1    c1.5,6.2,7,10.3,13.1,10.3c1.1,0,2.1-0.1,3.2-0.4c7.2-1.8,11.7-9.1,9.9-16.3C36.656,218.211,59.056,145.111,112.156,97.111z"></path>
                    <path d="M462.456,195.511c-1.8-7.2-9.1-11.7-16.3-9.9c-7.2,1.8-11.7,9.1-9.9,16.3c16.9,69.6-5.6,142.7-58.7,190.7    c-37.3,33.7-84.1,50.3-130.7,50.3c-44.5,0-88.9-15.1-124.7-44.9l58.8-5.3c7.4-0.7,12.9-7.2,12.2-14.7s-7.2-12.9-14.7-12.2l-88.9,8    c-7.4,0.7-12.9,7.2-12.2,14.7l8,88.9c0.6,7,6.5,12.3,13.4,12.3c0.4,0,0.8,0,1.2-0.1c7.4-0.7,12.9-7.2,12.2-14.7l-4.8-54.1    c36.3,29.4,80.8,46.5,128.3,48.9c3.8,0.2,7.6,0.3,11.3,0.3c55.1,0,107.5-20.2,148.7-57.4    C456.056,357.911,481.656,274.811,462.456,195.511z"></path>
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

      <div className="container xl:w-3/4 lg:w-full md:w-full sm:w-full mx-auto bg-blue-400 p-8 m-4">
        <div className="grid grid-cols-3 gap-6">
          <div className=" h-full grid col-span-1 justify-left p-4 m-4 ">
            {currentUser ? (
              <div>
                <p className="text-2xl p-2 text-left">Account</p>
                <img
                  className="w-2/3"
                  src={currentUser.photoURL ? currentUser.photoURL : BuildImg}
                  alt="profilePicture"
                ></img>
                <p className="text-xl p-4">
                  Welcome, {currentUser.displayName}
                </p>
                <div className="space-y-2 bg-blue-400">
                  <button
                    className="w-full flex items-center justify-between"
                    onClick={ShowAccount}
                  >
                    <span className="ml-2">
                      Profile <AccountCircleIcon />{" "}
                    </span>
                  </button>
                  <button
                    className=" w-full flex items-center justify-between"
                    onClick={ShowBuilds}
                  >
                    <span className="ml-2">
                      Builds <ConstructionIcon />{" "}
                    </span>
                  </button>
                  <button
                    className=" w-full flex items-center justify-between"
                    onClick={logOut}
                  >
                    <span className="ml-2">
                      Logout <LogoutIcon />{" "}
                    </span>
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-xl p-4"></p>
            )}
          </div>
          {/* <div className="h-full grid col-span-1 justify-left p-4 m-4">
             ... your sidebar content 
          </div> */}

          {/* Main content */}
          <div className="bg-pink-400 col-span-2 h-full p-4 m-4">
            {/* If loading, show loading text */}
            {loading && <p>Loading...</p>}

            {/* If not loading and no error, show main content */}
            {!loading && !error && <div>{/* ... your main content */}</div>}

            {/* If error, show error container */}
            {error && (
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
                      <path d="M112.156,97.111c72.3-65.4,180.5-66.4,253.8-6.7l-58.1,2.2c-7.5,0.3-13.3,6.5-13,14c0.3,7.3,6.3,13,13.5,13    c0.2,0,0.3,0,0.5,0l89.2-3.3c7.3-0.3,13-6.2,13-13.5v-1c0-0.2,0-0.3,0-0.5v-0.1l0,0l-3.3-88.2c-0.3-7.5-6.6-13.3-14-13    c-7.5,0.3-13.3,6.5-13,14l2.1,55.3c-36.3-29.7-81-46.9-128.8-49.3c-59.2-3-116.1,17.3-160,57.1c-60.4,54.7-86,137.9-66.8,217.1    c1.5,6.2,7,10.3,13.1,10.3c1.1,0,2.1-0.1,3.2-0.4c7.2-1.8,11.7-9.1,9.9-16.3C36.656,218.211,59.056,145.111,112.156,97.111z"></path>
                      <path d="M462.456,195.511c-1.8-7.2-9.1-11.7-16.3-9.9c-7.2,1.8-11.7,9.1-9.9,16.3c16.9,69.6-5.6,142.7-58.7,190.7    c-37.3,33.7-84.1,50.3-130.7,50.3c-44.5,0-88.9-15.1-124.7-44.9l58.8-5.3c7.4-0.7,12.9-7.2,12.2-14.7s-7.2-12.9-14.7-12.2l-88.9,8    c-7.4,0.7-12.9,7.2-12.2,14.7l8,88.9c0.6,7,6.5,12.3,13.4,12.3c0.4,0,0.8,0,1.2-0.1c7.4-0.7,12.9-7.2,12.2-14.7l-4.8-54.1    c36.3,29.4,80.8,46.5,128.3,48.9c3.8,0.2,7.6,0.3,11.3,0.3c55.1,0,107.5-20.2,148.7-57.4    C456.056,357.911,481.656,274.811,462.456,195.511z"></path>
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
      </div>
    </div>
  );
}
export default AccountComponent;
