import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/ContextProvider";

const Navbar = ({ setQuery, setFilteredNotes }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call the logout function to set user to null
    navigate("/"); // Navigate to home
    setFilteredNotes([]);
  };
  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <div className="text-xl font-bold">
        <Link to="/">NotesApp</Link>
      </div>
      <input
        type="text"
        placeholder="Search notes..."
        className="bg-gray-600 px-4 py-2 rounded"
        onChange={(e) => setQuery(e.target.value)}
      />
      <div>
        {!user ? (
          <>
            <Link to="/login" className="bg-blue-500 px-4 py-2 rounded mr-4">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-green-500 px-4 py-2 rounded mr-4"
            >
              Signup
            </Link>
          </>
        ) : (
          <>
            <span className="mr-4">{user.name}</span>
            <button
              className="bg-red-500 px-4 py-2 rounded"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
