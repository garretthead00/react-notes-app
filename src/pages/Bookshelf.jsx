import { useEffect, useState } from "react";
import Header from "../components/Header";
import NoteModal from "../components/NoteModal";
import TabBar from "../components/TabBar";
import NoteCard from "../components/NoteCard";
import { notesAPI } from "../api";
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
      await notesAPI.getAllNotes().then((res) => {
        setNotes(res);
      });
    }
    loadNotebooks();
  }, []);

  useEffect(() => {
    if (notes) {
      setFilteredNotes(filterNotes);
    }
  }, [notes, selectedNotebook, filterQuery]);

  const filterNotes = () => {
    return selectedNotebook !== "All"
    ? notes.filter(
        (note) =>
          note.notebook === selectedNotebook &&
          note.title.match(new RegExp(filterQuery, "i"))
      )
    : notes.filter((note) => note.title.match(new RegExp(filterQuery, "i")));
  };

  const selectNotebook = (name) => setSelectedNotebook(name);

  const closeModal = () => {
    setShowModal(!showModal);
  };

  const selectNote = (selected) => {
    setNote(selected);
    setShowModal(!showModal);
  };

  const deleteNote = async (note) => {
    console.group('-----deleting note: ', note)
    const deletedNote = await notesAPI.deleteNote(note.id);
    console.group('-deletedNote ', deletedNote);
    const remainingNotes = notes.filter((note) => note.id !== deletedNote.id);
    console.group('-remainingNotes ', remainingNotes);
    setNotes(remainingNotes);
  };
  const duplicateNote = async (note) => {
    const newNote = {
      ...note,
      id: uuidv4(),
      title: `[Copy]-${note.title}`,
      dateCreated: Date.now(),
    };
    const duplicatedNote = await notesAPI.createNote(newNote);
    setNotes([duplicatedNote, ...notes]);
    selectNote(duplicatedNote);
  };

  const createNote = async () => {
    const note = {
      id: uuidv4(),
      title: "",
      content: "",
      notebook: "",
      tags: [],
      dateCreated: Date.now(),
    };
    const newNote = await notesAPI.createNote(note);
    setNotes([newNote, ...notes]);
    selectNote(newNote);
  };

  const updateNote = async (note) => {
    const updatedNote = await notesAPI.updateNote(note);
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
                filteredNotes.map((note,idx) => (
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
