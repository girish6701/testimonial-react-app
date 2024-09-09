import React from "react";

function ThankYouForm({ appreciateData, handleAppreciateDataState }) {
  function handleAppreciateDataChange(e) {
    handleAppreciateDataState(e.target.name, e.target.value);
  }

  return (
    <>
      <div className="text-center px-2 mt-6">
        <p className="h1 font-semibold">Customize thank you page</p>
      </div>
      <div className="flex flex-col gap-6 mt-12">
        <div className="flex flex-col gap-2">
          <label for="appreciateTitle" className="text-gray-700 font-medium">
            Thank you title *
          </label>
          <input
            className="border rounded-lg px-4 py-3 border-gray-300"
            type="text"
            placeholder="Thank You :)"
            name="appreciateTitle"
            onChange={handleAppreciateDataChange}
            value={appreciateData["appreciateTitle"]}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label for="appreciateMessage" className="text-gray-700 font-medium">
            Thank you message *
          </label>
          <textarea
            className="border rounded-lg px-4 py-3 border-gray-300"
            placeholder="Thank you so much for your shoutout! It means a ton for us! 🙏"
            name="appreciateMessage"
            rows={5}
            onChange={handleAppreciateDataChange}
            value={appreciateData["appreciateMessage"]}
          />
        </div>
      </div>
    </>
  );
}

export default ThankYouForm;
