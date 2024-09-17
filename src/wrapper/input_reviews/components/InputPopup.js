import React, { useEffect, useState } from "react";
import Popup from "../../../util_components/Popup";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { v4 as uuidv4 } from "uuid";
import StarRatings from "../../../util_components/StarRatings";
import Loader from "../../../util_components/Loader";
import { useAuth } from "../../../util_components/AuthContext";

function InputPopup({ spaceData, showPopup, setShowPopup, setThankyouPopup }) {
  const [isLoading, setIsLoading] = useState(false);
  const [reviewData, setReviewData] = useState({
    id: uuidv4(),
    reviewerName: "",
    reviewerEmail: "",
    reviewerComment: "",
    isLiked: false,
    isDisabled: false,
    ratings: 5,
  });

  const { user } = useAuth();

  function handleRatingsChange(index) {
    setReviewData((prevData) => {
      return { ...prevData, ratings: index + 1 };
    });
  }

  function handleOnChange(e) {
    setReviewData((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value };
    });
  }

  async function submitReview() {
    setIsLoading(true);
    const spaceRef = doc(db, "spaces", "data");
    const spaceSnap = await getDoc(spaceRef);

    if (spaceSnap.exists()) {
      let currentValue = spaceSnap.data().allSpacesData;
      currentValue.forEach((space) => {
        if (space["spaceID"] === spaceData["spaceID"]) {
          space["reviews"].push(reviewData);
        }
      });
      console.log(currentValue);

      await updateDoc(spaceRef, {
        allSpacesData: currentValue,
      });
      alert("Review Submitted Successfully");
    }

    setShowPopup(false);
    setIsLoading(false);
    setThankyouPopup(true);
  }

  return (
    <div>
      <Popup isActive={showPopup} setIsActive={setShowPopup}>
        {isLoading && <Loader />}
        <div className="flex flex-col gap-6">
          <div className="h6 font-semibold text-gray-800">
            Write text testimonial to
          </div>
          <div>
            <img
              src="https://testimonial.to/static/media/just-logo.040f4fd2.svg"
              alt="logo"
              className="w-32"
            />
          </div>
          {spaceData?.testimonialForm["questionsList"]?.length > 0 && (
            <div>
              <p className="font-semibold p1 text-gray-600">QUESTIONS</p>
              <div className="h-1 w-12 mt-2 bg-[#567aad]"></div>
              <ul className="list-disc pl-8 mt-4 text-gray-500">
                {spaceData?.testimonialForm["questionsList"]?.map(
                  (question) => (
                    <li>{question}</li>
                  )
                )}
              </ul>
            </div>
          )}
          <StarRatings
            handleRatingsChange={handleRatingsChange}
            ratings={reviewData["ratings"]}
          />
          <textarea
            className="w-full border outline-none rounded-lg py-3 px-4 p2 border-gray-300 text-gray-500"
            rows={5}
            name="reviewerComment"
            value={reviewData["reviewerComment"]}
            onChange={handleOnChange}
          ></textarea>
          <div className="flex flex-col gap-2 w-full text-gray-500">
            <label for="reviewerName">Your Name*</label>
            <input
              type="text"
              className="rounded-lg py-3 px-4 p2 border-gray-300"
              placeholder="Enter Name"
              value={reviewData["reviewerName"]}
              name="reviewerName"
              onChange={handleOnChange}
            />
          </div>

          <div className="flex flex-col gap-2 w-full text-gray-500">
            <label for="reviewerEmail">Your Email*</label>
            <input
              type="email"
              className="rounded-lg py-3 px-4 p2 border-gray-300"
              placeholder="Enter email"
              value={reviewData["reviewerEmail"]}
              name="reviewerEmail"
              onChange={handleOnChange}
            />
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <div
              className="py-3 px-6 border rounded-lg hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setShowPopup(false);
              }}
            >
              Cancel
            </div>
            <div
              className="py-3 px-6 border bg-[#567aad] hover:bg-[#4571b0] text-white rounded-lg cursor-pointer"
              onClick={submitReview}
            >
              Send
            </div>
          </div>
        </div>
      </Popup>
    </div>
  );
}

export default InputPopup;
