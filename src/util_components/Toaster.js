import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Toaster() {
  return (
    <div>
      <ToastContainer
        progressStyle={{ background: "#567aad" }}
        bodyStyle={{ fontSize: "1.6rem" }}
      />
    </div>
  );
}

export default Toaster;
