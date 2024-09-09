import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../GenericComponents/Header";
import { db } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Loader from "../../GenericComponents/Loader";
import InputPopup from "./Components/InputPopup";

function InputReviews() {
  const { id, name } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [spaceData, setSpaceData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    getSpacesData();
  }, []);

  async function getSpacesData() {
    setIsLoading(true);
    const docRef = doc(db, "users_space", "1234");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let allSpacesData = docSnap.data().spaces;
      let selectedData = allSpacesData?.find(
        (space) =>
          space["spaceID"] == id &&
          space["testimonialForm"]["spaceName"].toLowerCase() ===
            name.toLowerCase()
      );
      console.log(selectedData);

      setSpaceData(selectedData);
    }
    setIsLoading(false);
  }

  return (
    <Header>
      {isLoading ? (
        <Loader />
      ) : !!spaceData ? (
        <div className="p1 flex flex-col gap-10 w-[60rem] max-w-full m-auto">
          <div className="m-auto">
            <img
              src="https://testimonial.to/static/media/just-logo.040f4fd2.svg"
              alt="logo"
              className="w-72"
            />
          </div>
          <div className="font-bold text-center text-8xl text-gray-700">
            {spaceData?.testimonialForm["headerTitle"]}
          </div>
          <div className="font-bold h2 text-center text-gray-500">
            {spaceData?.testimonialForm["customMessage"]}
          </div>
          <div>
            {spaceData?.testimonialForm["questionsList"]?.length > 0 && (
              <div>
                <p className="font-semibold h5 text-gray-600">QUESTIONS</p>
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
          </div>
          <div
            className="mt-6 flex items-center gap-6 text-white bg-gray-700 hover:bg-gray-800 w-full justify-center py-4 rounded-xl cursor-pointer"
            onClick={() => {
              setShowPopup(true);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8"
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
          {showPopup && (
            <InputPopup
              spaceData={spaceData}
              showPopup={showPopup}
              setShowPopup={setShowPopup}
            />
          )}
        </div>
      ) : (
        "Data Not Available. Please check the name and the id"
      )}
    </Header>
  );
}

export default InputReviews;
