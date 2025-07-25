// src/pages/NotFoundPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Frown } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12">
      <div className="text-center">
        <Frown className="w-24 h-24 text-primary mx-auto mb-6" />
        <h1 className="text-5xl font-bold">404</h1>
        <p className="text-xl mt-2">Oops! Page not found.</p>
        <p className="mt-4 text-base text-gray-500 dark:text-gray-400">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn btn-primary mt-6">
          Back to Home
        </Link>
      </div>
    </div>
  );
}