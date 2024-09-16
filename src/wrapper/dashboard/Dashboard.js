/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import Header from "../../util_components/Header";
import CreateSpace from "./components/CreateSpace";
import { db } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Loader from "../../util_components/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../util_components/AuthContext";

function Dashboard() {
  const { id } = useParams();

  const [showCreateSpace, setShowCreateSpace] = useState(id ? true : false);
  const [spacesData, setSpacesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentEditSpace, setCurrentEditSpace] = useState(null);

  const { user } = useAuth();

  const navigate = useNavigate();

  function handleCreateSpaceChange(action) {
    setShowCreateSpace(action);
  }

  useEffect(() => {
    getSpacesData();
  }, []);

  async function getSpacesData() {
    setIsLoading(true);
    const docRef = doc(db, "users_space", user["uid"]);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let allSpaces = docSnap.data().spaces;
      if (!!id) {
        let editSpace = allSpaces?.find((space) => space["spaceID"] == id);
        if (!editSpace) {
          alert("ID is wrong");
          navigate("/dashboard");
          handleCreateSpaceChange(false);
        } else {
          setCurrentEditSpace(editSpace);
        }
      }
      setSpacesData(docSnap.data().spaces);
    }
    setIsLoading(false);
  }

  function routeToCurrentSpace(id) {
    navigate(`/spaces/${id}`);
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : showCreateSpace ? (
        <CreateSpace
          getSpacesData={getSpacesData}
          handleCreateSpaceChange={handleCreateSpaceChange}
          editSpaceData={currentEditSpace}
        />
      ) : (
        <Header>
          <div className="flex flex-col gap-40 p1">
            <div className="flex justify-between items-center">
              <p className="h1 font-semibold">Spaces</p>
              <button
                className="bg-[#567aad] hover:bg-[#4571b0] text-white px-6 py-3 flex justify-center items-center rounded-xl font-medium"
                onClick={() => handleCreateSpaceChange(true)}
              >
                + Create a new space
              </button>
            </div>
            {spacesData &&
              (spacesData.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-10 text-gray-400 h6">
                  <img
                    className="w-96"
                    alt="No space tree"
                    src="https://testimonial.to/static/media/no-message.18de8749.svg"
                  />
                  <p>No space yet, add a new one?</p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-16">
                  {spacesData?.map((space) => (
                    <div
                      onClick={() => routeToCurrentSpace(space["spaceID"])}
                      className="bg-white shadow-sm hover:shadow-md rounded-lg flex border cursor-pointer"
                    >
                      <div className="w-1/4 border-r">
                        <img
                          className="w-full"
                          alt="img"
                          src="https://testimonial.to/static/media/no-message.18de8749.svg"
                        />
                      </div>
                      <div className="w-3/4 px-8 py-8">
                        <div className="h6 font-medium">
                          {space?.testimonialForm?.spaceName}
                        </div>
                        <div>Text: {space?.reviews?.length || 0}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </Header>
      )}
    </>
  );
}

export default Dashboard;
