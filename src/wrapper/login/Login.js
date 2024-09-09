import React, { useState } from "react";
import Loader from "../../util_components/Loader";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { signinWithGoogle } from "../../util_components/UtilFunctions";
import Header from "../../util_components/Header";
import { Link } from "react-router-dom";

function Login() {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  function handleOnChange(e) {
    setLoginDetails((prevDetails) => {
      return { ...prevDetails, [e.target.name]: e.target.value };
    });
  }

  function handleLoginSubmit() {
    for (let key in loginDetails) {
      if (!loginDetails[key]) {
        alert("Fill all details");
        return;
      }
    }
    setIsLoading(true);
    signinUser();
  }

  function signinUser() {
    const auth = getAuth();
    signInWithEmailAndPassword(
      auth,
      loginDetails["email"],
      loginDetails["password"]
    )
      .then((userCredential) => {
        setIsLoading(false);
        // Signed In
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        setIsLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  }

  return (
    <Header>
      <div className="p1 px-10 h-full w-full flex flex-col gap-20 items-center justify-center">
        {isLoading && <Loader />}
        <div className="font-bold h1">Welcome back 👋</div>
        <div className="bg-white p-10 dark:bg-gray-800 shadow rounded-3xl w-[44rem] max-w-full">
          <div className="flex flex-col gap-10">
            <div
              className="py-4 bg-gray-50 hover:bg-gray-100 w-full text-center text-gray-600 rounded-xl cursor-pointer border border-gray-300 flex items-center"
              onClick={signinWithGoogle}
            >
              <img
                alt="Google"
                className="w-9 h-9 mx-8"
                src="data:image/png;base64,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"
              />
              <div className="border-l border-gray-300 text-center flex-grow">
                Sign in with Google
              </div>
            </div>
            <div className="flex items-center w-full gap-6">
              <div className="h-[1px] flex-grow bg-slate-300"></div>
              <div className="text-gray-500">Or, sign in with your email</div>
              <div className="h-[1px] flex-grow bg-slate-300"></div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2 w-full text-gray-500">
                <label for="email">Email*</label>
                <input
                  type="email"
                  className="rounded-xl py-3 px-4 p2"
                  placeholder="Enter email"
                  value={loginDetails["email"]}
                  name="email"
                  onChange={handleOnChange}
                />
              </div>

              <div className="flex flex-col gap-2 w-full text-gray-500">
                <label for="password">Password*</label>
                <input
                  type="password"
                  className="rounded-xl py-3 px-4 p2"
                  placeholder="Enter password"
                  value={loginDetails["password"]}
                  name="password"
                  onChange={handleOnChange}
                />
              </div>

              <div
                className="flex justify-center cursor-pointer text-white rounded-xl py-3 bg-[#567aad] hover:bg-[#4571b0] w-full"
                onClick={handleLoginSubmit}
              >
                Sign In
              </div>
            </div>
            <div className="p2">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="cursor-pointer text-blue-700 hover:underline"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Header>
  );
}

export default Login;
