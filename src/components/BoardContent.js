import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addGroupLayoutSection,
  toggleIsCollapsed,
  setTheme,
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
    if (type === "status") {
      dispatch(addStatus(currentGroup));
      dispatch(
        addSectionToItems({
          type,
          groupId: currentGroup,
          newIndex: `t${lastIndex + 1}`,
        })
      );
      dispatch(
        addGroupLayoutSection({
          type,
          groupId: currentGroup,
          statusId: `s${statusesState.lastIndex + 1}`,
          newIndex: `t${lastIndex + 1}`,
        })
      );
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
    const openGroupThemes = () => {
      setMenuType("group-theme");
    };
    const setGroupTheme = (e) => {
      const themeValue = e.target.dataset.theme;
      dispatch(setTheme({ groupId: currentGroup, theme: themeValue }));
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
            <li onClick={openGroupThemes}>Change colour</li>
            <li>Rename</li>
            <li>Delete</li>
          </ul>
        </section>
      );
    }
    if (menuType === "group-theme") {
      return (
        <section
          className="group-theme-menu flex"
          style={{ top: menuCoordinates.top + 20, left: "50px" }}
        >
          <div
            className="theme-picker blue-main"
            data-theme="blue"
            onClick={setGroupTheme}
          ></div>
          <div
            className="theme-picker green-main"
            data-theme="green"
            onClick={setGroupTheme}
          ></div>
          <div
            className="theme-picker red-main"
            data-theme="red"
            onClick={setGroupTheme}
          ></div>
          <div
            className="theme-picker yellow-main"
            data-theme="yellow"
            onClick={setGroupTheme}
          ></div>
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
                statusList={statusList}
                setStatusList={setStatusList}
              />
            );
          })}
      </section>
      {isMenuOpen && <Menu />}
    </main>
  );
};

export default BoardContent;
