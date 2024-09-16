import React, { useState } from "react";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAuth, signOut } from "firebase/auth";
import { useAuth } from "./AuthContext";
import Loader from "./Loader";

function Header({ children }) {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  function logoutUser() {
    const auth = getAuth();
    setIsLoading(true);
    signOut(auth)
      .then(() => {
        alert("User signed out");
      })
      .catch((error) => {
        alert("Error signing out: ", error);
      });
    setIsLoading(false);
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="h-[100vh] w-full bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-gray-800">
          <div className="w-full py-8 border-b mb-8">
            <div className="m-auto max-w-[1440px] flex items-center justify-between">
              <div>Testimonial Icon</div>
              {user && (
                <div className="cursor-pointer" onClick={logoutUser}>
                  <FontAwesomeIcon
                    icon={faArrowRightFromBracket}
                    style={{ fontSize: "19px", color: "gray" }}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="w-full m-auto max-w-[1440px]">{children}</div>
        </div>
      )}
    </>
  );
}

export default Header;
