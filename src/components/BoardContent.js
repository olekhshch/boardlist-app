import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addGroup } from "../features/groups/groupsSlice";
import Group from "./Group";

const BoardContent = () => {
  const { activeBoardId } = useSelector((state) => state.boards);
  const { allGroups } = useSelector((state) => state.groups);

  const dispatch = useDispatch();

  const boardGroups = allGroups.filter(
    (group) => group.boardId === activeBoardId
  );

  if (boardGroups.length === 0) {
    dispatch(addGroup({ boardId: activeBoardId, title: "Initial group" }));
  }

  return (
    <main>
      <section id="groups-conteiner" className="flex-col">
        {boardGroups.map((group) => {
          return <Group key={`${activeBoardId}${group.id}`} group={group} />;
        })}
      </section>
    </main>
  );
};

export default BoardContent;
