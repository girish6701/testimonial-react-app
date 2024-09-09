import React, { useEffect, useState } from "react";
import StarRatings from "../../../util_components/StarRatings";

function Review({ content, likeReviews }) {
  //   const [isLiked, setIsLiked] = useState(content?.isLiked);

  return (
    <div className="p-10 bg-purple-50 rounded-lg flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <div className="py-2 px-10 relative bg-blue-100 text-blue-600 rounded-full font-semibold w-fit">
          <div className="absolute -left-2 -top-2 bg-white rounded-full">
            <svg
              class="h-9 w-9 text-green-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <div>Text</div>
        </div>
        <div
          className="cursor-pointer"
          onClick={() => {
            // setIsLiked((prevVal) => !prevVal);
            likeReviews(content["id"]);
          }}
        >
          <svg
            class="w-9 h-9 text-red-600 hover:text-red-400 dark:text-red-400 dark:hover:text-red-600"
            xmlns="http://www.w3.org/2000/svg"
            fill={content?.isLiked ? "currentColor" : "none"}
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            ></path>
          </svg>
        </div>
      </div>
      <StarRatings ratings={content["ratings"]} />
      <div>{content["reviewerComment"]}</div>
      <div className="flex gap-40">
        <div>
          <div className="text-gray-400 font-semibold">Name</div>
          <div>{content["reviewerName"]}</div>
        </div>
        <div>
          <div className="text-gray-400 font-semibold">Email</div>
          <div>{content["reviewerEmail"]}</div>
        </div>
      </div>
    </div>
  );
}

export default Review;
