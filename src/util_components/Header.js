import React, { useState } from "react";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAuth, signOut } from "firebase/auth";
import { useAuth } from "./AuthContext";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Header({ children, showRightMenu = true }) {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  function logoutUser() {
    const auth = getAuth();
    setIsLoading(true);
    signOut(auth)
      .then(() => {
        toast("User signed out")
      })
      .catch((error) => {
        toast("Error signing out: ", error)
      });
    setIsLoading(false);
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="h-[100vh] w-full bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-gray-800">
          <div className="w-full py-8 border-b mb-8 px-8">
            <div className="m-auto max-w-[1440px] flex items-center justify-between">
              <div onClick={() => navigate("/")} className="cursor-pointer">
                Testimonial Icon
              </div>
              {showRightMenu && user && (
                <div className="cursor-pointer" onClick={logoutUser}>
                  <FontAwesomeIcon
                    icon={faArrowRightFromBracket}
                    style={{ fontSize: "19px", color: "gray" }}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="w-full m-auto max-w-[1440px] px-8">{children}</div>
        </div>
      )}
    </>
  );
}

export default Header;
