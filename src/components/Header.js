import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addBoard,
  setBoardName,
  setBoardDescription,
  setBoardsState,
} from "../features/boards/boardsSlice";
import {
  addGroup,
  collapseAll,
  expandAll,
  setGroupsState,
} from "../features/groups/groupsSlice";
import { setItemsState } from "../features/items/itemsSlice";

const Header = () => {
  const boardsState = useSelector((state) => state.boards);
  const { activeBoardId, allBoards } = boardsState;
  const groupsState = useSelector((state) => state.groups);
  const { allGroups } = groupsState;
  const { isOpen } = useSelector((state) => state.sidebar);
  const activeBoard = allBoards.find((board) => board.id === activeBoardId);

  const itemsState = useSelector((state) => state.items);
  let groups = allGroups.filter((group) => group.boardId === activeBoardId);
  const [boardNameValue, setBoardNameValue] = useState(activeBoard.title);
  const [boardDescValue, setBoardDescValue] = useState(activeBoard.description);

  useEffect(() => {
    setBoardNameValue(activeBoard.title);
    setBoardDescValue(activeBoard.description);
  }, [activeBoardId]);

  useEffect(() => {
    groups = allGroups.filter((group) => group.boardId === activeBoardId);
    const countElement = document.getElementById("header-count");
    const countGroups = groups.length;
    if (countGroups === 0) {
      countElement.innerHTML = "";
    } else if (countGroups === 1) {
      countElement.innerHTML = "1 group";
    } else {
      countElement.innerHTML = `${countGroups} groups`;
    }
  });

  const dispatch = useDispatch();

  const handleSubmitName = (e) => {
    e.preventDefault();
    const newValue = e.target.elements.title.value;
    if (newValue === "") {
      setBoardNameValue(activeBoard.title);
    } else {
      dispatch(setBoardName({ newTitle: newValue, id: activeBoardId }));
    }
  };

  const handleSubmitDesc = (e) => {
    e.preventDefault();
    dispatch(
      setBoardDescription({ id: activeBoardId, newDescription: boardDescValue })
    );
  };

  const collapseGroups = () => {
    dispatch(collapseAll(activeBoardId));
  };

  const expandGroups = () => {
    dispatch(expandAll(activeBoardId));
  };

  const loadState = () => {
    const fetchBoards = axios
      .get("/boards", "utf-8")
      .then((response) => response.data)
      .then((data) => dispatch(setBoardsState(data)));

    const fetchGroups = axios
      .get("/groups", "utf-8")
      .then((response) => response.data)
      .then((data) => dispatch(setGroupsState(data)));

    const fetchItems = axios
      .get("/items", "utf-8")
      .then((response) => response.data)
      .then((data) => dispatch(setItemsState(data)));

    Promise.all([fetchBoards, fetchGroups, fetchItems]);
  };

  const saveState = () => {
    const postItems = axios.post("/items", itemsState);
    const postGroups = axios.post("/groups", groupsState);
    const postBoards = axios.post("/boards", boardsState);

    Promise.all([postGroups]).then(console.log("post done"));
  };

  return (
    <header className={`board-header ${!isOpen && "board-header-collapsed"}`}>
      <div className="flex-col">
        <section className="flex-col">
          <form onSubmit={handleSubmitName} className="flex-col">
            <input
              className="board-header-name"
              name="title"
              value={boardNameValue}
              onChange={(e) => setBoardNameValue(e.target.value)}
            ></input>
          </form>
          <form onSubmit={handleSubmitDesc} className="flex-col">
            <input
              className="board-header-descr"
              name="description"
              value={boardDescValue}
              onChange={(e) => setBoardDescValue(e.target.value)}
            ></input>
          </form>
          <p id="header-count">2 groups, 6 items</p>
        </section>
        <section className="header-buttons flex">
          <div style={{ gap: "30px", display: "flex" }}>
            <button
              className="btn-main blue-main"
              onClick={() =>
                dispatch(
                  addGroup({ boardId: activeBoardId, title: "New group" })
                )
              }
            >
              New group
            </button>
            <button className="btn-secondary" onClick={collapseGroups}>
              Collapse all
            </button>
            <button className="btn-secondary" onClick={expandGroups}>
              Expand all
            </button>
          </div>
          <div style={{ display: "flex", gap: "30px" }}>
            <button className="btn-secondary" onClick={loadState}>
              Load state
            </button>
            <button className="btn-secondary" onClick={saveState}>
              Save state
            </button>
          </div>
        </section>
      </div>
    </header>
  );
};

export default Header;
