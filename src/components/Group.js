import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { renameGroup, toggleIsCollapsed } from "../features/groups/groupsSlice";
import { FaChevronDown } from "react-icons/fa";
import { BiDotsHorizontal } from "react-icons/bi";

import Table from "./Table";

const Group = ({
  group,
  setIsMenuOpen,
  setMenuCoordinates,
  setCurrentGroup,
  currentGroup,
  menuType,
  setMenuType,
  statusList,
  setStatusList,
}) => {
  const { title, id, isCollapsed, theme } = group;
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

  const toggleGroupMenu = (e) => {
    setCurrentGroup(id);
    setMenuType("group-options");
    setIsMenuOpen(true);
    const { left, top } = e.target.getBoundingClientRect();
    setMenuCoordinates({ left, top: top + 20 });
  };

  if (isCollapsed) {
    return (
      <div
        className="group-collapsed flex"
        onClick={() => dispatch(toggleIsCollapsed(id))}
      >
        <div className="flex-col group-panel">
          <h2 className="group-title" style={{ color: `var(--${theme}-main)` }}>
            {title}
          </h2>
          <p>{itemsCount}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="group">
      <div className="flex group-panel">
        <button className={`group-options-btn`} onClick={toggleGroupMenu}>
          <BiDotsHorizontal className="icon" />
        </button>
        <button
          className="group-collapse-btn"
          onClick={() => dispatch(toggleIsCollapsed(id))}
        >
          <FaChevronDown />
        </button>
        <form onSubmit={handleSubmit}>
          <input
            className="group-title"
            style={{ color: `var(--${theme}-main)` }}
            value={groupTitle}
            onChange={(e) => setGroupTitle(e.target.value)}
          />
        </form>
      </div>
      <Table
        type="group"
        parent={group}
        setIsMenuOpen={setIsMenuOpen}
        setMenuCoordinates={setMenuCoordinates}
        setCurrentGroup={setCurrentGroup}
        currentGroup={currentGroup}
        setMenuType={setMenuType}
        menuType={menuType}
        statusList={statusList}
        setStatusList={setStatusList}
      ></Table>
    </div>
  );
};

export default Group;
