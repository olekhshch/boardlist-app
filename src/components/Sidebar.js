import { setInputValue, toggleIsOpen } from "../features/sidebar/sidebarSlice";
import {
  addBoard,
  deleteBoard,
  setActiveBoard,
  togglePinBoard,
} from "../features/boards/boardsSlice";
import { addGroup, deleteGroup } from "../features/groups/groupsSlice";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import { AiOutlineRight } from "react-icons/ai";
import { resetSelectedItems } from "../features/system/systemSlice";
import { BsFillPinAngleFill } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";
import { deleteItemsByGroup } from "../features/items/itemsSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { inputValue, isOpen } = useSelector((state) => state.sidebar);

  const { allBoards, activeBoardId, lastIndex } = useSelector(
    (state) => state.boards
  );

  const { allGroups } = useSelector((state) => state.groups);
  const { items } = useSelector((state) => state.items);

  const pinnedBoards = allBoards.filter((board) => board.isPinned === true);
  const otherBoards = allBoards.filter((board) => !board.isPinned);

  const sbRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      const sizeBox = sbRef.current.getBoundingClientRect();
      console.log(sizeBox);
    }
  });

  if (!isOpen) {
    return (
      <>
        <div className="sb-spaceholder sb-collapsed"></div>
        <nav className="sb sb-collapsed">
          <button
            className="sb-toggle-btn sb-toggle-btn-collapsed"
            style={{ left: "28px" }}
            onClick={() => dispatch(toggleIsOpen())}
          >
            <AiOutlineRight />
          </button>
        </nav>
      </>
    );
  }

  const changeActive = (newId) => {
    if (newId !== activeBoardId) {
      dispatch(resetSelectedItems());
      dispatch(setActiveBoard(newId));
    }
  };

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

  const BoardListComp = ({ board }) => {
    const { id, isPinned, title } = board;

    const deleteB = (e) => {
      const boardGroups = allGroups
        .filter((group) => group.boardId === id)
        .map((group) => group.id);

      boardGroups.forEach((groupId) => {
        dispatch(deleteItemsByGroup({ groupId }));
        dispatch(deleteGroup({ groupId }));
      });
      if (id === activeBoardId && allBoards.length > 1) {
        const newActiveBoard = allBoards.filter((board) => board.id !== id)[0];
        dispatch(setActiveBoard(newActiveBoard.id));
      }
      if (allBoards.length !== 1) {
        dispatch(deleteBoard({ boardId: id }));
      } else {
        console.log("Create a new group in order to delete this one");
      }
      e.stopPropagation();
    };

    const togglePin = (e) => {
      dispatch(togglePinBoard({ boardId: id }));
      e.stopPropagation();
    };
    return (
      <div
        key={id}
        data-board-id={id}
        className={`sb-list-item flex ${
          activeBoardId === id && "sb-list-active"
        }`}
        onClick={() => changeActive(id)}
      >
        {isPinned && <BsFillPinAngleFill style={{ marginRight: "4px" }} />}
        {title}
        <div className="sb-list-btn-conteiner flex">
          <button
            className="icon-btn"
            title={isPinned ? "Unpin" : "Pin"}
            onClick={togglePin}
          >
            <BsFillPinAngleFill />
          </button>
          <button className="icon-btn" title="Delete" onClick={deleteB}>
            <FaTrashAlt />
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="sb-spaceholder"></div>
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
          {pinnedBoards.map((board) => (
            <BoardListComp board={board} key={board.id} />
          ))}
          {otherBoards.map((board) => (
            <BoardListComp board={board} key={board.id} />
          ))}
        </div>
        <button id="sidebar-settings-btn">Settings</button>
        <button
          className="sb-toggle-btn"
          style={{ left: "207px" }}
          onClick={() => dispatch(toggleIsOpen())}
        >
          <AiOutlineRight className="icon" />
        </button>
      </nav>
    </>
  );
};

export default Sidebar;
