import React from "react";

function Popup({ children, isActive, setIsActive }) {
  function closePopup() {
    setIsActive(false);
  }

  return (
    <>
      {isActive && (
        <div className="w-full h-[100vh] z-10 fixed top-0 left-0 flex items-center justify-center bg-gray-100 bg-opacity-50">
          <div className="bg-white w-[50rem] max-w-full rounded-xl relative">
            <div
              className="absolute -top-12 right-0 cursor-pointer"
              onClick={closePopup}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </div>
            <div className="w-full p-10 max-h-[80vh] overflow-auto">
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Popup;
