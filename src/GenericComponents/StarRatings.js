import React, { useState } from "react";

function StarRatings({ ratings = 5, handleRatingsChange = () => {} }) {
  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5]?.map((elem, index) => (
        <svg
          onMouseEnter={() => handleRatingsChange(index)}
          viewBox="0 0 51 48"
          className="widget-svg cursor-pointer"
          style={{
            width: "24px",
            height: "24px",
            transition: "transform 0.2s ease-in-out",
          }}
        >
          <path
            class="star"
            d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"
            style={{
              fill: index + 1 <= ratings ? "rgb(255, 182, 33)" : "lightgrey",
              transition: "fill 0.2s ease-in-out",
            }}
          ></path>
        </svg>
      ))}
    </div>
  );
}

export default StarRatings;
