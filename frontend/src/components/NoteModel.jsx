import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const NoteModel = ({ closeModel, addNote, currentNode, editNote }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (currentNode) {
      setTitle(currentNode.title);
      setBody(currentNode.body);
    }
  }, [currentNode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentNode) {
      editNote(currentNode._id, title, body);
    } else {
      addNote(title, body);
    }
  };
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-8 rounded">
        <h2 className="text-xl font-bold mb-4">
          {currentNode ? "Edit Note" : "Add New Note"}
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note Title"
            className="border p-2 w-full mb-4"
          />
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Note Body"
            className="border p-2 w-full mb-4"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            {currentNode ? "Update Note" : "Add Note"}
          </button>
        </form>
        <button
          type="button"
          className="mt-4 text-red-500"
          onClick={closeModel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default NoteModel;
