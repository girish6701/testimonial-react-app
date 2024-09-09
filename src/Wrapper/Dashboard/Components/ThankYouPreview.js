import React from "react";

function ThankYouPreview({ appreciateData }) {
  return (
    <>
      <div className="text-green-600 bg-green-200 rounded-full px-16 font-medium py-1 absolute -top-5 left-10">
        Live Preview
      </div>
      <img
        src="https://media1.giphy.com/media/g9582DNuQppxC/giphy.gif?cid=ecf05e47ibtkj6mhht2m6gpzy157hwtxvlxlzqlijwrfqh8i&rid=giphy.gif"
        alt="thank you gif"
        className="rounded-lg mt-10"
      />
      <div className="h1 font-semibold text-gray-600 text-center">
        {appreciateData["appreciateTitle"]
          ? appreciateData["appreciateTitle"]
          : "Header goes here..."}
      </div>
      <div className="text-gray-500 text-center">
        {appreciateData["appreciateMessage"]
          ? appreciateData["appreciateMessage"]
          : "Your custom message goes here..."}
      </div>
    </>
  );
}

export default ThankYouPreview;
