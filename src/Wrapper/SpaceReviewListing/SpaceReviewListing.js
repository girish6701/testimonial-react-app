import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Header from "../../GenericComponents/Header";
import Loader from "../../GenericComponents/Loader";
import Review from "./Components/Review";

function SpaceReviewListing() {
  const { id } = useParams();
  const [spaceData, setSpaceData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSpacesData();
  }, []);

  async function getSpacesData() {
    setIsLoading(true);
    const docRef = doc(db, "users_space", "1234");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let allSpacesData = docSnap.data().spaces;
      let selectedData = allSpacesData?.find((space) => space["spaceID"] == id);
      console.log(selectedData);

      setSpaceData(selectedData);
    }
    setIsLoading(false);
  }

  async function likeReviews(currentReviewID) {
    const docRef = doc(db, "users_space", "1234");
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

  return (
    <Header>
      {isLoading ? (
        <Loader />
      ) : !!spaceData ? (
        <div className="p1 flex flex-col gap-20">
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
          <div>
            <div
              title="Copy an iFrame code to embed in your website"
              className="font-semibold bg-blue-400 w-fit py-3 px-8 rounded-full text-white cursor-pointer"
            >
              Wall of Love
            </div>
          </div>

          {spaceData?.reviews?.length > 0 ? (
            <div className="grid grid-cols-3 gap-12">
              {spaceData?.reviews?.map((elem) => (
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
