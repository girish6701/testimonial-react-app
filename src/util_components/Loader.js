import React from "react";
import { Bars } from "react-loader-spinner";

function Loader() {
  return (
    <div className="w-full h-[100vh] z-50 fixed top-0 left-0 flex items-center justify-center bg-gray-100 bg-opacity-50">
      <Bars
        height="80"
        width="80"
        color="#567aad"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}

export default Loader;
