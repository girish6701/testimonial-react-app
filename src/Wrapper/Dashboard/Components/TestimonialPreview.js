import React from "react";

function TestimonialPreview({ spaceData }) {
  return (
    <>
      <div className="text-green-600 bg-green-200 rounded-full px-10 font-medium py-1 absolute -top-5 left-10">
        Live Preview
      </div>
      <img
        src="https://testimonial.to/static/media/just-logo.040f4fd2.svg"
        alt="Thumbs up"
        className="w-40 m-auto"
      />
      <div className="h1 font-semibold text-gray-600 text-center">
        {spaceData["headerTitle"]
          ? spaceData["headerTitle"]
          : "Header goes here..."}
      </div>
      <div className="text-gray-500 text-center">
        {spaceData["customMessage"]
          ? spaceData["customMessage"]
          : "Your custom message goes here..."}
      </div>
      {spaceData["questionsList"]?.length > 0 && (
        <div>
          <p className="font-semibold h6 text-gray-600">QUESTIONS</p>
          <div className="h-1 w-12 mt-2 bg-[#567aad]"></div>
          <ul className="list-disc pl-8 mt-4 text-gray-500">
            {spaceData["questionsList"]?.map((question) => (
              <li>{question}</li>
            ))}
          </ul>
        </div>
      )}

      <div class="mt-10 text-white bg-gray-700 w-full px-4 py-3 cursor-pointer flex gap-4 items-center justify-center rounded-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8 mr-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          ></path>
        </svg>
        <div>Send in text</div>
      </div>
    </>
  );
}

export default TestimonialPreview;
