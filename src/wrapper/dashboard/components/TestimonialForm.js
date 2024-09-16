import React from "react";

function TestimonialForm({
  spaceData,
  handleSpaceDataState,
  submitSpaceFormData,
  editSpaceData,
}) {
  function handleSpaceDataChange(e) {
    handleSpaceDataState(e.target.name, e.target.value);
  }

  function handleQuestionsList(e, ind) {
    let ques = [...spaceData["questionsList"]];
    ques[ind] = e.target.value;

    handleSpaceDataState("questionsList", ques);
  }

  function addNewQuestions() {
    if (spaceData["questionsList"].length === 5) {
      alert("Cannot add more than 5");
      return;
    }

    handleSpaceDataState("questionsList", [...spaceData["questionsList"], ""]);
  }

  function handleDeleteQuestions(index) {
    handleSpaceDataState(
      "questionsList",
      spaceData["questionsList"].filter((elem, ind) => ind !== index)
    );
  }

  return (
    <>
      <div className="text-center px-2 mt-6">
        <p className="h1 font-semibold">
          {!!editSpaceData ? "Update Space" : "Create a new Space"}
        </p>
        <p className="mt-6 h6 text-gray-600">
          {!editSpaceData &&
            "After the Space is created, it will generate a dedicated page for collecting testimonials"}
        </p>
      </div>
      <div className="flex flex-col gap-6 mt-12">
        <div className="flex flex-col gap-2">
          <label for="spaceName" className="text-gray-700 font-medium">
            Space Name *
          </label>
          <input
            className="border rounded-lg px-4 py-3 border-gray-300"
            type="text"
            name="spaceName"
            onChange={handleSpaceDataChange}
            value={spaceData["spaceName"]}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label for="headerTitle" className="text-gray-700 font-medium">
            Header Title *
          </label>
          <input
            className="border rounded-lg px-4 py-3 border-gray-300"
            type="text"
            placeholder="Would you like to give a shoutout for xyz?"
            name="headerTitle"
            onChange={handleSpaceDataChange}
            value={spaceData["headerTitle"]}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label for="customMessage" className="text-gray-700 font-medium">
            Your custom message *
          </label>
          <textarea
            className="border rounded-lg px-4 py-3 border-gray-300"
            placeholder="Write a warm message to your customers, and give them simple directions on how to make the best testimonial."
            name="customMessage"
            rows={5}
            onChange={handleSpaceDataChange}
            value={spaceData["customMessage"]}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-gray-700 font-medium">Questions</label>
          <div className="flex flex-col gap-3">
            {spaceData["questionsList"]?.length === 0 ? (
              <div className="p3">No questions present</div>
            ) : (
              spaceData["questionsList"]?.map((question, index) => (
                <div className="flex gap-4 items-center">
                  <input
                    className="border rounded-lg px-4 py-3 border-gray-300 flex-grow"
                    type="text"
                    placeholder="Keep it short!"
                    value={question}
                    onChange={(e) => handleQuestionsList(e, index)}
                  />
                  <div onClick={() => handleDeleteQuestions(index)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-9 w-9 text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      ></path>
                    </svg>
                  </div>
                </div>
              ))
            )}
          </div>
          <div
            className="flex gap-2 items-center cursor-pointer mt-2 w-fit p2"
            onClick={addNewQuestions}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="h-8 w-8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <div>Add One (Upto 5)</div>
          </div>
        </div>

        <button
          className="bg-[#567aad] hover:bg-[#4571b0] py-3 text-white rounded-lg mt-4"
          onClick={submitSpaceFormData}
        >
          {!!editSpaceData ? "Update Space" : "Create New Space"}
        </button>
      </div>
    </>
  );
}

export default TestimonialForm;
