// src/pages/LoadingPage.jsx
import React from "react";
import Lottie from "lottie-react";
import loadingAnimation from "/blue_loading.json";

export default function LoadingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <Lottie animationData={loadingAnimation} loop={true} className="w-64 h-64" />
      <h2 className="text-2xl font-semibold mt-6">Loading, please wait...</h2>
    </div>
  );
}