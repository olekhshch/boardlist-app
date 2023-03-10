import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { renameGroup, toggleIsCollapsed } from "../features/groups/groupsSlice";
import { FaChevronDown } from "react-icons/fa";

import Table from "./Table";

const Group = ({
  group,
  setIsMenuOpen,
  setMenuCoordinates,
  setCurrentGroup,
  currentGroup,
}) => {
  const { title, id, isCollapsed } = group;
  const dispatch = useDispatch();

  const { allItems } = useSelector((state) => state.items);
  const groupItems = allItems.filter((item) => item.groupId === id);
  const itemsCount = groupItems.length;

  const [groupTitle, setGroupTitle] = useState(title);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(id);
    if (groupTitle.trim() !== "") {
      dispatch(renameGroup({ id, title: groupTitle.trim() }));
    }
  };

  if (isCollapsed) {
    return (
      <div
        className="group-collapsed flex"
        onClick={() => dispatch(toggleIsCollapsed(id))}
      >
        <div className="flex-col group-panel">
          <h2 className="group-title blue-main-font">{title}</h2>
          <p>{itemsCount}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="group">
      <div className="flex group-panel">
        <button
          className="group-collapse-btn"
          onClick={() => dispatch(toggleIsCollapsed(id))}
        >
          <FaChevronDown />
        </button>
        <form onSubmit={handleSubmit}>
          <input
            className="group-title blue-main-font"
            value={groupTitle}
            onChange={(e) => setGroupTitle(e.target.value)}
          />
        </form>
        <div className="group-buttons">
          <button>Settings</button>
        </div>
      </div>
      <Table
        type="group"
        parent={group}
        setIsMenuOpen={setIsMenuOpen}
        setMenuCoordinates={setMenuCoordinates}
        setCurrentGroup={setCurrentGroup}
        currentGroup={currentGroup}
      ></Table>
    </div>
  );
};

export default Group;
