import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addGroupLayoutSection,
  toggleIsCollapsed,
  setTheme,
  addGroup,
} from "../features/groups/groupsSlice";
import { addSectionToItems } from "../features/items/itemsSlice";
import { addStatus } from "../features/statuses/statusesSlice";
import Group from "./Group";

const BoardContent = () => {
  const { activeBoardId } = useSelector((state) => state.boards);
  const { allGroups } = useSelector((state) => state.groups);
  const statusesState = useSelector((state) => state.statuses);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuType, setMenuType] = useState("add-section");
  const [menuCoordinates, setMenuCoordinates] = useState({
    left: 200,
    top: 300,
  });
  const [currentGroup, setCurrentGroup] = useState(null);

  const [statusList, setStatusList] = useState({
    isOpen: false,
    itemId: null,
    statusId: null,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const board = document.getElementById("board");

    const closeMenu = () => {
      setCurrentGroup(null);
      setIsMenuOpen(false);
    };
    board.addEventListener("scroll", closeMenu);
  }, []);

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
          return (
            <Group
              key={`${activeBoardId}${group.id}`}
              setIsMenuOpen={setIsMenuOpen}
              setMenuCoordinates={setMenuCoordinates}
              group={group}
              currentGroup={currentGroup}
              setCurrentGroup={setCurrentGroup}
              menuType={menuType}
              setMenuType={setMenuType}
              statusList={statusList}
              setStatusList={setStatusList}
            />
          );
        })}
      </section>
    </main>
  );
};

export default BoardContent;
