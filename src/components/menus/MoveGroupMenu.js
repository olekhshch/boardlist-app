import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { moveToAnotherBoard } from "../../features/groups/groupsSlice";
import { closeMenu } from "../../features/menu/menuSlice";

const MoveGroupMenu = () => {
  const { coordinates, groupId } = useSelector((state) => state.menu);
  const { allBoards, activeBoardId } = useSelector((state) => state.boards);
  const dispatch = useDispatch();

  const boardList = allBoards.filter((board) => board.id !== activeBoardId);

  const moveGroupToSelectedBoard = (e) => {
    const newBoardId = e.target.dataset.boardId;
    dispatch(moveToAnotherBoard({ groupId, newBoardId }));
    dispatch(closeMenu());
  };
  return (
    <section
      className="menu"
      style={{ left: coordinates.left, top: coordinates.top }}
    >
      <h4>Choose a new board:</h4>
      <ul>
        {boardList.map((board) => {
          return (
            <li
              key={board.id}
              data-board-id={board.id}
              onClick={moveGroupToSelectedBoard}
            >
              {board.title}
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default MoveGroupMenu;
