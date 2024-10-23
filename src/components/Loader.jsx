import React from "react";
import { ThreeDot } from "react-loading-indicators";

export default function Loader() {
  return (
    <div className="h-full w-full fixed backdrop-blur-sm bg-black z-30 bg-opacity-50 flex flex-col items-center justify-center">
      <ThreeDot color={"#E5E5E5"} size="large" />
      <p className="text-[#E5E5E5] text-2xl mt-5">Loading...</p>
    </div>
  );
}
