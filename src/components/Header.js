import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addBoard,
  setBoardName,
  setBoardDescription,
} from "../features/boards/boardsSlice";
import {
  addGroup,
  collapseAll,
  expandAll,
} from "../features/groups/groupsSlice";

const Header = () => {
  const { activeBoardId, allBoards } = useSelector((state) => state.boards);
  const { allGroups } = useSelector((state) => state.groups);
  const { isOpen } = useSelector((state) => state.sidebar);
  const activeBoard = allBoards.find((board) => board.id === activeBoardId);

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
          <button
            className="btn-main blue-main"
            onClick={() =>
              dispatch(addGroup({ boardId: activeBoardId, title: "New group" }))
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
        </section>
      </div>
    </header>
  );
};

export default Header;
