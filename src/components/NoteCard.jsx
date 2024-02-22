import { FaRegCopy, FaTrashAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const NoteCard = ({
  idx,
  note,
  notebook,
  handleSelectNote,
  handleDeleteNote,
  handleDuplicateNote,
}) => {
  return (
    <motion.li
      initial={{
        opacity: 0,
        translateX: 90,
        translateY: 90,
      }}
      animate={{ opacity: 1, translateX: 0, translateY: 0 }}
      transition={{ duration: 0.3, delay: idx * 0.075 }}
      className="w-[328px] min-w-[328px] max-w-[328px] max-h-[156px] border px-4 rounded-xl cursor-pointer hover:opacity-50 bg-white shadow-md"
    >
      <div className="flex flex-row gap-x-4 my-2 justify-end text-l text-gray-500 h-6">
        <div className="flex-1">
          {notebook.name !== "All" && (
            <span
              className={`rounded-xl py-1 px-4 max-w-1/2 text-sm ${notebook.color}`}
            >
              {notebook.name}
            </span>
          )}
        </div>
        <FaRegCopy onClick={handleDuplicateNote} />
        <FaTrashAlt onClick={handleDeleteNote} />
      </div>
      <div onClick={handleSelectNote} className="mt-4">
        <h2 className="my-2 text-l font-medium">{note.title}</h2>
        <p className="h-[48px] max-h-[48px] overflow-hidden text-ellipsis whitespace-nowrap text-sm">
          {note.content}
        </p>
      </div>
    </motion.li>
  );
};

export default NoteCard;
