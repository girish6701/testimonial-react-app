import React from "react";

function Popup({ children, isActive, setIsActive }) {
  return (
    <>
      {isActive && (
        <div className="w-full h-[100vh] z-50 fixed top-0 left-0 flex items-center justify-center bg-gray-100 bg-opacity-50">
          <div className="bg-white w-[50rem] p-10 max-w-full max-h-[80vh] overflow-auto rounded-xl">
            {children}
          </div>
        </div>
      )}
    </>
  );
}

export default Popup;
