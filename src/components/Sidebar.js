import { setInputValue, toggleIsOpen } from "../features/sidebar/sidebarSlice";
import {
  addBoard,
  setActiveBoard,
  setBoardName,
} from "../features/boards/boardsSlice";
import { addGroup } from "../features/groups/groupsSlice";

import { useSelector, useDispatch } from "react-redux";
import { BiDotsHorizontal } from "react-icons/bi";
import { useEffect, useRef } from "react";
import { AiOutlineRight } from "react-icons/ai";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { inputValue, isOpen } = useSelector((state) => state.sidebar);

  const { allBoards, activeBoardId, lastIndex } = useSelector(
    (state) => state.boards
  );

  const { allGroups } = useSelector((state) => state.groups);
  console.log(allBoards);

  const sbRef = useRef(null);

  const CollapseBtn = () => {
    const sbElement = document.querySelector("nav.sb");
    const { right } = sbElement.getBoundingClientRect();
    return (
      <button className="sb-toggle-btn" style={{ right }}>
        <AiOutlineRight />
      </button>
    );
  };

  useEffect(() => {
    if (isOpen) {
      const sizeBox = sbRef.current.getBoundingClientRect();
      console.log(sizeBox);
    }
  });

  if (!isOpen) {
    return (
      <nav className="sb sb-collapsed">
        <button
          className="sb-toggle-btn"
          style={{ left: "28px" }}
          onClick={() => dispatch(toggleIsOpen())}
        >
          <AiOutlineRight />
        </button>
      </nav>
    );
  }

  const handleChange = (e) => {
    dispatch(setInputValue(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = inputValue;
    if (title.trim() !== "") {
      dispatch(addBoard(title));
      dispatch(setInputValue(""));
      dispatch(setActiveBoard(`b${lastIndex + 1}`));
      dispatch(
        addGroup({ boardId: `b${lastIndex + 1}`, title: "Initial group" })
      );
    }
  };

  return (
    <nav className="sb flex-col" ref={sbRef}>
      <div className="sb-form">
        <form className="flex" onSubmit={handleSubmit}>
          <input
            id="sb-input flex-grow-1"
            placeholder="New boards' name"
            value={inputValue}
            onChange={handleChange}
          ></input>
        </form>
      </div>
      <div className="boards-list flex-col flex-grow-1">
        {allBoards.map(({ id, title }) => {
          return (
            <div
              key={id}
              className={`sb-list-item flex ${
                activeBoardId === id && "sb-list-active"
              }`}
              onClick={() => dispatch(setActiveBoard(id))}
            >
              <div className="flex-grow-1">{title}</div>
              <BiDotsHorizontal className="icon" />
            </div>
          );
        })}
      </div>
      <button id="sidebar-settings-btn">Settings</button>
      <button
        className="sb-toggle-btn"
        style={{ left: "207px" }}
        onClick={() => dispatch(toggleIsOpen())}
      >
        <AiOutlineRight />
      </button>
    </nav>
  );
};

export default Sidebar;
