import { useEffect, useRef, useState } from "react";
import { RiCloseFill } from "react-icons/ri";
import { notebooks } from "../data";
import { getNotebookColor } from "../utils";

const NoteModal = ({ selectedNote, closeModal, updateNote }) => {
  const [note, setNote] = useState();
  const [selectColor, setSelectColor] = useState("");
  const [editing, setEditing] = useState(true);

  const titleRef = useRef();
  const notebookRef = useRef();
  const contentRef = useRef();

  useEffect(() => {
    if (selectedNote) {
      setNote(selectedNote);
      setSelectColor(getNotebookColor(selectedNote.notebook));
    }
  }, [selectedNote]);

  const update = () => {
    const updatedNote = {
      ...note,
      title: titleRef.current.innerText,
      notebook: notebookRef.current.value,
      content: contentRef.current.innerText,
    };
    setNote(updatedNote);
    setEditing(!editing);
    updateNote(updatedNote);
    closeModal();
  };

  const handleSelect = () => {
    setSelectColor(getNotebookColor(notebookRef.current.value));
  };

  return (
    <div className="absolute top-2 flex flex-grow items-center justify-center w-full h-screen border backdrop-blur-sm p-2 sm:p-6">
      <div className="flex flex-1 flex-col min-h-4/5 h-4/5 border rounded-lg bg-white">
        <div className="flex gap-x-2 justify-end mb-4 p-2 text-2xl">
          <RiCloseFill onClick={update} />
        </div>
        {note && (
          <div className="flex flex-col px-4 sm:px-12 overflow-auto">
            <div className="flex flex-row flex-wrap-reverse border-b-2 mb-6 pb-2">
              <div
                ref={titleRef}
                placeholder="Title"
                contentEditable={true}
                suppressContentEditableWarning={true}
                className="note-control w-full text-lg sm:flex-1 sm:text-3xl font-semibold focus:outline-none"
              >
                {note.title}
              </div>
              <div className="float-right h-8">
                <select
                  name="selectedNotebook"
                  ref={notebookRef}
                  className={`border rounded-lg w-24 xs:w-36 text-lg px-2 ${selectColor}`}
                  defaultValue={note.notebook}
                  onChange={handleSelect}
                >
                  {notebooks &&
                    notebooks.map((notebook) => (
                      <option value={notebook.name} data-value={notebook}>
                        {notebook.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div
              ref={contentRef}
              placeholder="Write something..."
              contentEditable={editing}
              suppressContentEditableWarning={true}
              className="note-control flex-1 focus:outline-none mb-8 whitespace-pre-line"
            >
              {note.content}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteModal;
