import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { db } from "../../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Header from "../../util_components/Header";
import Loader from "../../util_components/Loader";
import Review from "./components/Review";
import { useAuth } from "../../util_components/AuthContext";
import { toast } from "react-toastify";

function SpaceReviewListing() {
  const { id } = useParams();
  const [spaceData, setSpaceData] = useState(null);
  const [allReviewsData, setAllReviewsData] = useState([]);
  const [searchedReviews, setSearchedReviews] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    getSpacesData();
  }, []);

  async function getSpacesData() {
    setIsLoading(true);
    const spaceRef = doc(db, "spaces", "data");
    const spaceSnap = await getDoc(spaceRef);

    if (spaceSnap.exists()) {
      let allSpacesData = spaceSnap.data().allSpacesData;

      let selectedData = allSpacesData?.find((space) => space["spaceID"] == id);
      console.log(selectedData);

      setSpaceData(selectedData);
      setAllReviewsData(selectedData?.reviews);
      setSearchedReviews(selectedData?.reviews);
    }
    setIsLoading(false);
  }

  async function likeReviews(currentReviewID) {
    const spaceRef = doc(db, "spaces", "data");
    const spaceSnap = await getDoc(spaceRef);

    if (spaceSnap.exists()) {
      let currentValue = spaceSnap.data().allSpacesData;
      currentValue.forEach((space) => {
        if (space["spaceID"] === spaceData["spaceID"]) {
          space["reviews"].forEach((review) => {
            if (review["id"] === currentReviewID) {
              review["isLiked"] = !review["isLiked"];
            }
          });
        }
      });
      console.log(currentValue);

      await updateDoc(spaceRef, {
        allSpacesData: currentValue,
      });

      getSpacesData();
    }
  }

  useEffect(() => {
    if (!spaceData) return;

    if (searchVal === "") {
      setSearchedReviews(allReviewsData);
      return;
    }

    let filteredReviews = allReviewsData?.filter(
      (review) =>
        review["reviewerName"]
          .toLowerCase()
          .includes(searchVal.toLowerCase()) ||
        review["reviewerEmail"].toLowerCase().includes(searchVal.toLowerCase())
    );
    setSearchedReviews(filteredReviews);
  }, [searchVal]);

  async function handleDeleteSpaces() {
    setIsLoading(true);
    const id = spaceData["spaceID"];
    const spaceRef = doc(db, "spaces", "data");
    const spaceSnap = await getDoc(spaceRef);
    const docRef = doc(db, "users_space", user["uid"]);
    const docSnap = await getDoc(docRef);

    if (spaceSnap.exists()) {
      let allSpacesData = spaceSnap.data().allSpacesData;
      let userSpacesData = docSnap.data().spaces;

      let filteredData = allSpacesData?.filter(
        (space) => space["spaceID"] != id
      );

      let userFilteredData = userSpacesData?.filter((spaceId) => spaceId != id);

      await updateDoc(spaceRef, {
        allSpacesData: filteredData,
      });

      await updateDoc(docRef, {
        spaces: userFilteredData,
      });
      toast("Space deleted successfully");
      navigate("/dashboard");
    }
    setIsLoading(false);
  }

  return (
    <Header>
      {isLoading ? (
        <Loader />
      ) : !!spaceData ? (
        <div className="p1 flex flex-col gap-20">
          <div className="flex items-center justify-between">
            <div>
              <p className="h1 font-semibold">
                {spaceData["testimonialForm"]["spaceName"]}
              </p>
              <Link
                className="underline text-gray-500"
                to={`/${spaceData["spaceID"]}/${spaceData["testimonialForm"][
                  "spaceName"
                ]
                  ?.split(" ")
                  ?.join("-")}`}
              >
                Space Public URL
              </Link>
            </div>
            <div className="flex gap-6 items-center">
              <div
                className="cursor-pointer text-white border-2 border-[#567aad] rounded-full py-2 px-8 bg-[#567aad] hover:bg-[#4571b0]"
                onClick={() => navigate(`/dashboard/${id}`)}
              >
                Edit
              </div>

              <div
                className="cursor-pointer text-[#567aad] border-2 border-[#567aad] hover:bg-gray-100 rounded-full py-2 px-8 "
                onClick={() => handleDeleteSpaces()}
              >
                Delete
              </div>
            </div>
          </div>
          <div>
            <div
              title="Copy an iFrame code to embed in your website"
              className="font-semibold bg-blue-400 w-fit py-3 px-8 rounded-full text-white cursor-pointer"
            >
              Wall of Love
            </div>
          </div>

          <div className="flex gap-4 items-center border w-fit border-gray-400 py-3 px-4 rounded-xl">
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
            <input
              type="text"
              placeholder="Search by name or email"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              className="border-none bg-transparent"
            />
          </div>

          {searchedReviews?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
              {searchedReviews?.map((elem) => (
                <Review content={elem} likeReviews={likeReviews} />
              ))}
            </div>
          ) : (
            <div className="w-full text-center">No reviews yet</div>
          )}
        </div>
      ) : (
        <div className="h4 text-center">
          Data Not Available. Please check the id
        </div>
      )}
    </Header>
  );
}

export default SpaceReviewListing;
