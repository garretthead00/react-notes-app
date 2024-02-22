const Header = ({ handleCreateNote, handleSearch}) => {
  return (
    <header className="flex bg-white border-b-[1px] shadow-lg">
      <div className="flex flex-row gap-2 w-3/4 max-w-3/4 mx-auto h-fit py-2">
        <input
          className="flex-1 border rounded-md px-2 bg-gray-100 placeholder:text-gray-400"
          type="text"
          placeholder="Search"
          onChange={(e) => handleSearch(e.target.value)}
        />
        <button className="btn rounded-xl bg-blue-300 text-sm text-white px-4" onClick={handleCreateNote}>
          + New
        </button>
      </div>
    </header>
  );
};

export default Header;
