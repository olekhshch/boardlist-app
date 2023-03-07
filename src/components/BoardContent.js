import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addGroup } from "../features/groups/groupsSlice";
import Group from "./Group";

const BoardContent = () => {
  const { activeBoardId } = useSelector((state) => state.boards);
  const { allGroups } = useSelector((state) => state.groups);
  let groups = allGroups.filter((group) => group.borderId === activeBoardId);

  return (
    <main>
      <section id="groups-conteiner" className="flex-col">
        {allGroups
          .filter((group) => group.boardId === activeBoardId)
          .map((group) => {
            return <Group id={group.id} group={group} />;
          })}
      </section>
    </main>
  );
};

export default BoardContent;
