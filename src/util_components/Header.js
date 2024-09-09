import React from "react";

function Header({ children }) {
  return (
    <div className="h-[100vh] w-full bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="w-full m-auto max-w-[1440px]">{children}</div>
    </div>
  );
}

export default Header;
