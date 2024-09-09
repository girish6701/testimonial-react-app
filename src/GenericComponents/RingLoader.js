import React from "react";
import { ColorRing } from "react-loader-spinner";

function RingLoader() {
  return (
    <div className="z-50 flex items-center justify-center">
      <ColorRing
        visible={true}
        height="45"
        width="45"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={["#2563eb"]}
      />
    </div>
  );
}

export default RingLoader;
