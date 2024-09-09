import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import RingLoader from "../../util_components/RingLoader";
import StarRatings from "../../util_components/StarRatings";

function ShowTestimonials() {
  const { id, userId } = useParams();
  const [likedReviewsData, setLikedReviewsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSpacesData();
  }, []);

  async function getSpacesData() {
    setIsLoading(true);
    const docRef = doc(db, "users_space", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let allSpacesData = docSnap.data().spaces;
      let selectedData = allSpacesData?.find((space) => space["spaceID"] == id);
      console.log(selectedData);

      selectedData = selectedData["reviews"]?.filter(
        (review) => review["isLiked"]
      );

      setLikedReviewsData(selectedData);
    }
    setIsLoading(false);
  }

  return (
    <>
      {isLoading ? (
        <RingLoader />
      ) : (
        <div className="p1 px-4 flex gap-6 flex-wrap justify-center max-w-[900px] mx-auto">
          {likedReviewsData?.length > 0 ? (
            <>
              {likedReviewsData?.map((review) => (
                <div className="p-10 rounded-xl flex flex-col gap-8 w-[240px] max-w-full bg-white hover:bg-gray-50 border text-gray-800">
                  <div className="flex items-center gap-6 h6">
                    <div className="w-16 h-16 text-white font-medium flex items-center justify-center bg-blue-600 rounded-full">
                      {review.reviewerName[0]}
                    </div>
                    <div className="font-semibold">{review.reviewerName}</div>
                  </div>
                  <div>
                    <StarRatings ratings={review?.ratings || 5} />
                  </div>
                  <div>{review.reviewerComment}</div>
                </div>
              ))}
            </>
          ) : (
            <div>No reviews available</div>
          )}
        </div>
      )}
    </>
  );
}

export default ShowTestimonials;
