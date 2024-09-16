import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { db } from "../../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Header from "../../util_components/Header";
import Loader from "../../util_components/Loader";
import Review from "./components/Review";
import { useAuth } from "../../util_components/AuthContext";

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
    const docRef = doc(db, "users_space", user["uid"]);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let allSpacesData = docSnap.data().spaces;
      let selectedData = allSpacesData?.find((space) => space["spaceID"] == id);
      console.log(selectedData);

      setSpaceData(selectedData);
      setAllReviewsData(selectedData?.reviews);
      setSearchedReviews(selectedData?.reviews);
    }
    setIsLoading(false);
  }

  async function likeReviews(currentReviewID) {
    const docRef = doc(db, "users_space", user["uid"]);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let currentValue = docSnap.data()["spaces"];
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

      await updateDoc(docRef, {
        spaces: currentValue,
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
                to={`/${spaceData["spaceID"]}/${spaceData["testimonialForm"]["spaceName"]}`}
              >
                Space Public URL
              </Link>
            </div>
            <div
              className="cursor-pointer text-white border rounded-full py-3 px-8 bg-[#567aad] hover:bg-[#4571b0]"
              onClick={() => navigate(`/dashboard/${id}`)}
            >
              Edit Space
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
            <div className="grid grid-cols-3 gap-12">
              {searchedReviews?.map((elem) => (
                <Review content={elem} likeReviews={likeReviews} />
              ))}
            </div>
          ) : (
            <div className="w-full text-center">No reviews yet</div>
          )}
        </div>
      ) : (
        <div>Data Not Available. Please check the id</div>
      )}
    </Header>
  );
}

export default SpaceReviewListing;
