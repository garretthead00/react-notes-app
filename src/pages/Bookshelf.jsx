import { useEffect, useState } from "react";
import Header from "../components/Header";
import NoteModal from "../components/NoteModal";
import TabBar from "../components/TabBar";
import NoteCard from "../components/NoteCard";
import { mockNotes } from "../data";
import { v4 as uuidv4 } from "uuid";
import { getNotebookData } from "../utils";

const Bookshelf = () => {
  const [notes, setNotes] = useState();
  const [filterQuery, setFilterQuery] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [selectedNotebook, setSelectedNotebook] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [note, setNote] = useState();

  useEffect(() => {
    async function loadNotebooks() {
      setNotes(mockNotes);
    }
    loadNotebooks();
  }, []);

  useEffect(() => {
    if (notes) {
      const filtered =
        selectedNotebook !== "All"
          ? notes.filter(
              (note) =>
                note.notebook === selectedNotebook &&
                note.title.match(new RegExp(filterQuery, "i"))
            )
          : notes.filter((note) =>
              note.title.match(new RegExp(filterQuery, "i"))
            );
      setFilteredNotes(filtered);
    }
  }, [notes, selectedNotebook, filterQuery]);;

  const selectNotebook = (name) => setSelectedNotebook(name);

  const closeModal = () => {
    setShowModal(!showModal);
  };

  const selectNote = (selected) => {
    setNote(selected);
    setShowModal(!showModal);
  };

  const deleteNote = async (note) => {
    const remainingNotes = notes.filter((n) => n.id !== note.id);
    setNotes(remainingNotes);
  };
  const duplicateNote = async (note) => {
    const duplicatedNote = {
      ...note,
      id: uuidv4(),
      title: `[Copy]-${note.title}`,
      dateCreated: Date.now(),
    };
    setNotes([duplicatedNote, ...notes]);
    selectNote(duplicatedNote);
  };

  const createNote = async () => {
    const newNote = {
      id: uuidv4(),
      title: "",
      content: "",
      notebook: "",
      tags: [],
      dateCreated: Date.now(),
    };
    setNotes([newNote, ...notes]);
    selectNote(newNote);
  };

  const updateNote = async (updatedNote) => {
    setNotes(
      notes.map((note) => {
        return note.id === updatedNote.id ? updatedNote : note;
      })
    );
  };

  const searchNotes = (searchQuery) => {
    setFilterQuery(searchQuery);
  };

  return (
    <div className="relative h-screen overflow-x-hidden overflow-y-auto">
      <Header handleCreateNote={createNote} handleSearch={searchNotes} />
      <div className="container mx-auto mt-8">
        <h1 className="text-3xl font-semibold mb-6">Your notes</h1>
        <section className="flex flex-col">
          <TabBar selectNotebook={selectNotebook} />
          <div>
            <ul className="flex flex-wrap gap-4 xs:justify-center sm:justify-start">
              {filteredNotes && filteredNotes.length > 0 ? (
                filteredNotes.map((note, idx) => (
                  <NoteCard
                    key={`note-card-${note.id}`}
                    idx={idx}
                    note={note}
                    notebook={getNotebookData(note)}
                    handleDeleteNote={() => deleteNote(note)}
                    handleSelectNote={() => selectNote(note)}
                    handleDuplicateNote={() => duplicateNote(note)}
                  />
                ))
              ) : (
                <h1>No notes in here yet...</h1>
              )}
            </ul>
          </div>
        </section>
      </div>
      {showModal && (
        <NoteModal
          closeModal={closeModal}
          selectedNote={note}
          updateNote={updateNote}
        />
      )}
    </div>
  );
};

export default Bookshelf;
