import React, { useState, useEffect } from "react";
import Navbar from "../components/NavBar";
import { useAuth } from "../context/ContextProvider";
import NoteModel from "../components/NoteModel";
import axios from "axios";
import NoteCard from "../components/NoteCard";
import { useSearchParams } from "react-router-dom";
import WelcomePage from "../components/WelcomePage";

const HomePage = () => {
  const { user, logout } = useAuth();
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [currentNode, setCurrentNode] = useState(null);
  const [query, setQuery] = useState("");

  const closeModel = () => {
    console.log("CloseModel Cliced");
    setIsModelOpen(false);
    setCurrentNode(null);
  };

  useEffect(() => {
    if (user) {
      fetchNotes();
    }
  }, [user]);

  useEffect(() => {
    setFilteredNotes(
      notes.filter(
        (note) =>
          note.title.toLowerCase().includes(query.toLowerCase()) ||
          note.body.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query, notes]);

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        "https://notesapp-backend-lr9j.onrender.com/note",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      setNotes(data.notes);
    } catch (error) {
      console.log(error.message);
      console.log("from the useeffect");
    }
  };

  const addNote = async (title, body) => {
    try {
      const response = await axios.post(
        "https://notesapp-backend-lr9j.onrender.com/note/create",
        {
          title,
          body,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
      }
      fetchNotes();
      closeModel();
      console.log(response);
    } catch (error) {
      console.error(
        "Error adding note:",
        error.response?.data || error.message
      );
    }
  };

  const editNote = async (id, title, body) => {
    try {
      const response = await axios.patch(
        `https://notesapp-backend-lr9j.onrender.com/note/${id}`,
        {
          title,
          body,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
      }
      fetchNotes();
      setCurrentNode(null);
      closeModel();
      console.log(response);
    } catch (error) {
      console.error(
        "Error updating note:",
        error.response?.data || error.message
      );
    }
  };

  const deleteNode = async (id) => {
    try {
      const response = await axios.delete(
        `https://notesapp-backend-lr9j.onrender.com/note/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
      }
      fetchNotes();
      setCurrentNode(null);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const onEdit = (note) => {
    setCurrentNode(note);
    setIsModelOpen(true);
  };

  return (
    <>
      <div className="bg-gray-100">
        <Navbar setQuery={setQuery} setFilteredNotes={setFilteredNotes} />
      </div>
      {/* <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note, index) => (
            <NoteCard
              key={index}
              note={note}
              onEdit={onEdit}
              deleteNode={deleteNode}
            />
          ))}
        </div>
      </div> */}
      <div className="container mx-auto p-4">
        <div className="px-8 pt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredNotes.length > 0 ? (
            filteredNotes.map((note, index) => (
              <NoteCard
                key={index}
                note={note}
                onEdit={onEdit}
                deleteNode={deleteNode}
              />
            ))
          ) : (
            <div>
              {/* <p>No notes</p>
              <p>Login and add notes</p> */}
              <div className="flex-container justify-items-center">
                <WelcomePage />
              </div>
            </div>
          )}
        </div>
      </div>
      {user ? (
        <button
          onClick={() => setIsModelOpen(true)}
          className="fixed right-4 bottom-4 bg-green-500 text-white rounded-full font-bold p-6 shadow-lg text-xl"
        >
          +
        </button>
      ) : null}

      {isModelOpen && (
        <NoteModel
          closeModel={closeModel}
          addNote={addNote}
          editNote={editNote}
          currentNode={currentNode}
        />
      )}
    </>
  );
};

export default HomePage;
