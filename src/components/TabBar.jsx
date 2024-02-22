import { useEffect, useState } from "react";
import { notebooks } from "../data";

const TabBar = ({ selectNotebook }) => {
  const [tabs, setTabs] = useState();
  const [activeIndex, setActiveIndex] = useState();

  useEffect(() => {
    setTabs(notebooks);
    setActiveIndex(0)
  }, []);

  const handleSelect = (idx, tab) => {
    setActiveIndex(idx)
    selectNotebook(tab.name)
  }

  return (
    <ul className="flex flex-row pb-1 mb-4 font-semibold uppercase text-gray-500 text-sm">
      {tabs &&
        tabs.map((tab, idx) => (
          <li
            key={`tab-${idx}`}
            className={`text-center px-4 border-b-[1px] ${idx === activeIndex ? 'border-blue-400 text-blue-400' : ''}`}
            onClick={() => handleSelect(idx, tab)}
          >
            {tab.name}
          </li>
        ))}
    </ul>
  );
};

export default TabBar;
