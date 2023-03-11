import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addGroup,
  addGroupLayoutSection,
  toggleIsCollapsed,
} from "../features/groups/groupsSlice";
import { addSectionToItems } from "../features/items/itemsSlice";
import Group from "./Group";

const BoardContent = () => {
  const { activeBoardId } = useSelector((state) => state.boards);
  const { allGroups } = useSelector((state) => state.groups);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuType, setMenuType] = useState("add-section");
  const [menuCoordinates, setMenuCoordinates] = useState({
    left: 200,
    top: 300,
  });
  const [currentGroup, setCurrentGroup] = useState(null);

  const dispatch = useDispatch();

  const addLayoutSection = (e) => {
    const type = e.target.innerHTML;
    const { lastIndex } = allGroups.find(
      (group) => group.id === currentGroup
    ).groupLayout;
    if (type === "text") {
      dispatch(
        addSectionToItems({
          type,
          groupId: currentGroup,
          newIndex: `t${lastIndex + 1}`,
        })
      );
      dispatch(addGroupLayoutSection({ type, groupId: currentGroup }));
    }
    setIsMenuOpen(false);
    setCurrentGroup(null);
  };

  const Menu = () => {
    const targetGroup = allGroups.find((group) => group.id === currentGroup);
    const toggleCollapsed = () => {
      dispatch(toggleIsCollapsed(currentGroup));
      setIsMenuOpen(false);
    };
    if (menuType === "add-section") {
      return (
        <ul
          className="board-menu"
          style={{ top: menuCoordinates.top, left: menuCoordinates.left }}
        >
          <li onClick={addLayoutSection}>text</li>
          <li onClick={addLayoutSection}>number</li>
          <li onClick={addLayoutSection}>status</li>
        </ul>
      );
    }
    if (menuType === "group-options") {
      return (
        <section
          className="board-menu group-options"
          style={{ top: menuCoordinates.top, left: menuCoordinates.left }}
        >
          <ul>
            <li onClick={toggleCollapsed}>
              {targetGroup.isCollapsed ? "Expand" : "Collapse"}
            </li>
            <li>Change colour</li>
            <li>Rename</li>
            <li>Delete</li>
          </ul>
        </section>
      );
    }
  };

  useEffect(() => {
    const board = document.getElementById("board");

    const closeMenu = () => {
      setCurrentGroup(null);
      setIsMenuOpen(false);
    };
    board.addEventListener("scroll", closeMenu);
  }, []);

  return (
    <main>
      <section id="groups-conteiner" className="flex-col">
        {allGroups
          .filter((group) => group.boardId === activeBoardId)
          .map((group) => {
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
              />
            );
          })}
      </section>
      {isMenuOpen && <Menu />}
    </main>
  );
};

export default BoardContent;
