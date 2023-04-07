import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { renameGroup, toggleIsCollapsed } from "../features/groups/groupsSlice";
import { FaChevronDown } from "react-icons/fa";
import { BiDotsHorizontal } from "react-icons/bi";
import { openGroupMenu } from "../features/menu/menuSlice";

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
  const [showArchieved, setShowArchieved] = useState(false);

  const [titleEditMode, setTitleEditMode] = useState(false);
  const [titleInputWidth, setTitleInputWidth] = useState(140);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(id);
    if (groupTitle.trim() !== "") {
      dispatch(renameGroup({ id, title: groupTitle.trim() }));
    }
    setTitleEditMode(false);
  };

  const toggleGroupMenu = (e) => {
    const { left, top } = e.target.getBoundingClientRect();
    console.log(left);
    dispatch(
      openGroupMenu({
        coordinates: { left: left + 10, top: top + 10 },
        groupId: id,
      })
    );
  };

  const editMode = (e) => {
    const { width } = e.target.getBoundingClientRect();
    setTitleInputWidth(width);
    setTitleEditMode(true);
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
          {!titleEditMode ? (
            <span
              onMouseOver={editMode}
              className="group-title"
              style={{ color: `var(--${theme}-main)` }}
            >
              {groupTitle}
            </span>
          ) : (
            <input
              className="group-title"
              data-group-id={id}
              style={{
                color: `var(--${theme}-main)`,
                width: `${titleInputWidth}px`,
              }}
              value={groupTitle}
              onChange={(e) => setGroupTitle(e.target.value)}
            />
          )}
          {showArchieved && (
            <span
              title="Hide archieved"
              className="group-active-effect"
              style={{ backgroundColor: `var(--${theme}-bg)` }}
              onClick={() => setShowArchieved(false)}
            >
              A
            </span>
          )}
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
        showArchieved={showArchieved}
        setShowArchieved={setShowArchieved}
      ></Table>
    </div>
  );
};

export default Group;
