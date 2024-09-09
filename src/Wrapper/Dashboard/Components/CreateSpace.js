import React, { useEffect, useState } from "react";
import TestimonialPreview from "./TestimonialPreview";
import TestimonialForm from "./TestimonialForm";
import ThankYouForm from "./ThankYouForm";
import ThankYouPreview from "./ThankYouPreview";
// import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import Loader from "../../../util_components/Loader";
import { v4 as uuidv4 } from "uuid";

function CreateSpace({ handleCreateSpaceChange, getSpacesData }) {
  const [selectedTestimonialTab, setSelectedTestimonialTab] = useState("basic");
  const [spaceData, setSpaceData] = useState({
    spaceName: "",
    headerTitle: "",
    customMessage: "",
    questionsList: [
      "Who are you / what are you working on?",
      "How has [our product / service] helped you?",
      "What is the best thing about [our product / service]",
    ],
  });
  const [appreciateData, setAppreciateData] = useState({
    appreciateTitle: "Thank you!",
    appreciateMessage:
      "Thank you so much for your shoutout! It means a ton for us! 🙏",
  });
  const [isLoading, setIsLoading] = useState(false);

  function handleSpaceDataState(dataKey, dataVal) {
    setSpaceData((prevData) => {
      return { ...prevData, [dataKey]: dataVal };
    });
  }

  function handleAppreciateDataState(dataKey, dataVal) {
    setAppreciateData((prevData) => {
      return { ...prevData, [dataKey]: dataVal };
    });
  }

  function checkDataValidity(data) {
    for (let key in data) {
      let value = data[key];
      if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          if (!value[i]) {
            return false;
          }
        }
      } else {
        if (!value) {
          return false;
        }
      }
    }

    return true;
  }

  async function submitSpaceFormData() {
    let isValid1 = checkDataValidity(spaceData);
    let isValid2 = checkDataValidity(appreciateData);

    if (isValid1 === false || isValid2 === false) {
      alert("Please fill all details");
      return;
    }

    setIsLoading(true);
    const docRef = doc(db, "users_space", "1234");
    const docSnap = await getDoc(docRef);

    try {
      if (docSnap.exists()) {
        await updateDoc(docRef, {
          spaces: arrayUnion({
            spaceID: uuidv4(),
            testimonialForm: spaceData,
            appreciateForm: appreciateData,
            reviews: [],
          }),
        });
      } else {
        await setDoc(docRef, {
          name: "",
          email: "",
          spaces: [
            {
              spaceID: uuidv4(),
              testimonialForm: spaceData,
              appreciateForm: appreciateData,
              reviews: [],
            },
          ],
        });
      }
      alert("Space create successfully :)");
      handleCreateSpaceChange(false);
      getSpacesData();
    } catch (e) {
      alert(e);
    }
    setIsLoading(false);
  }

  return (
    <div
      className="py-12 p1 bg-[#ecf0f5] bg-scroll min-h-[100vh] max-h-full flex items-center"
      style={{
        background:
          "radial-gradient(#d7e0ea 18.75%, transparent 0) 2px 2px / 10px 10px #ecf0f5",
        backgroundImage: "radial-gradient(#d7e0ea 18.75%, transparent 0)",
        backgroundPositionX: "2px",
        backgroundPositionY: "2px",
        backgroundSize: "10px 10px",
        backgroundOrigin: "initial",
        backgroundClip: "initial",
      }}
    >
      {isLoading && <Loader />}
      <div className="w-full relative p-16 flex rounded-2xl gap-10 m-auto shadow-xl max-w-[1240px] bg-white">
        <button
          className="absolute top-8 right-8"
          onClick={() => handleCreateSpaceChange(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
        <div className="w-2/5 flex flex-col gap-8">
          <div className="w-full h-fit border px-10 pt-6 pb-12 rounded-2xl flex flex-col gap-6 relative">
            {selectedTestimonialTab === "basic" && (
              <TestimonialPreview spaceData={spaceData} />
            )}

            {selectedTestimonialTab === "thank-you" && (
              <ThankYouPreview appreciateData={appreciateData} />
            )}
          </div>
          {selectedTestimonialTab === "thank-you" && (
            <div
              className="border rounded-lg px-8 py-2 w-fit cursor-pointer hover:bg-gray-100 flex items-center gap-4 text-gray-700"
              onClick={() => setSelectedTestimonialTab("basic")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              Back
            </div>
          )}
        </div>
        <div className="w-3/5">
          <div className="px-12 m-auto">
            <div className="flex justify-center">
              <div
                className={`${
                  selectedTestimonialTab === "basic" &&
                  "bg-[#567aad] text-white"
                } border py-3 px-10 rounded-l-lg flex gap-4 cursor-pointer`}
                onClick={() => setSelectedTestimonialTab("basic")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  class="w-7"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                  ></path>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
                Basic
              </div>
              <div
                className={`${
                  selectedTestimonialTab === "thank-you" &&
                  "bg-[#567aad] text-white"
                } border py-3 px-10 rounded-r-lg flex gap-4 cursor-pointer`}
                onClick={() => setSelectedTestimonialTab("thank-you")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  class="w-7"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  ></path>
                </svg>
                Thank You Page
              </div>
            </div>
            <div className="h-[1px] w-1/3 mt-8 m-auto bg-gray-300"></div>
            {selectedTestimonialTab === "basic" && (
              <TestimonialForm
                spaceData={spaceData}
                handleSpaceDataState={handleSpaceDataState}
                submitSpaceFormData={submitSpaceFormData}
              />
            )}

            {selectedTestimonialTab === "thank-you" && (
              <ThankYouForm
                appreciateData={appreciateData}
                handleAppreciateDataState={handleAppreciateDataState}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateSpace;
