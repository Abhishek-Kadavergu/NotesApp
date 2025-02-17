import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/ContextProvider";

const WelcomePage = () => {
  const { user } = useAuth();

  if (user) {
    return null; // Render nothing if the user is present
  }

  return (
    <div className="w-full h-screen bg-gradient-to-r from-blue-100 to-blue-300 flex items-center justify-center">
      <div className="flex flex-col md:flex-row items-center justify-center">
        <div className="text-center p-8 bg-white shadow-2xl rounded-lg max-w-2xl w-full mx-4 mb-8 md:mb-0">
          <h1 className="text-5xl font-bold text-blue-700 mb-6">
            Welcome to NotesApp
          </h1>
          <p className="text-gray-700 mb-8 text-lg">
            Your personal note-taking app. Stay organized, stay productive!
          </p>
          <Link to="/login">
            <button className="bg-blue-600 text-white py-3 px-6 rounded-full hover:bg-blue-800 transition duration-300">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
