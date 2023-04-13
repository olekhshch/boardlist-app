import { useSelector, useDispatch } from "react-redux";
import Item from "./Item";
import { addItem } from "../features/items/itemsSlice";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { setSectionWidth } from "../features/groups/groupsSlice";
import {
  openTableSectionMenu,
  openSectionSettingsMenu,
  openSectionDescriptionWindow,
} from "../features/menu/menuSlice";
import { BiDotsHorizontal } from "react-icons/bi";
import Circle from "./icons/Circle";
import { selectItemsByGroup } from "../features/system/systemSlice";

const Table = ({
  parent,
  setIsMenuOpen,
  currentGroup,
  menuType,
  statusList,
  setStatusList,
  showArchieved,
  setShowArchieved,
}) => {
  const { groupLayout, id, theme } = parent;
  const { allItems } = useSelector((state) => state.items);
  const allGroupItems = allItems.filter((item) => item.groupId === id);
  const unarchievedItems = allGroupItems.filter(
    (item) => item.isArchieved === false
  );
  const archievedItems = allGroupItems.filter(
    (item) => item.isArchieved === true
  );

  const archievedCount = archievedItems.length;

  const [newItemInput, setNewItemInput] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const layout = parent.groupLayout.content;
    console.log(layout);
    if (newItemInput.trim() !== "") {
      dispatch(addItem({ groupId: id, layout, mainValue: newItemInput }));
      setNewItemInput("");
    }
  };

  const openAddSectionMenu = (e) => {
    const { left, top } = e.target.getBoundingClientRect();
    dispatch(
      openTableSectionMenu({
        coordinates: { left, top },
        group: parent,
      })
    );
  };

  const dividerMousedown = (e) => {
    const oldX = e.clientX;
    const sectionId = e.target.dataset.layoutid;
    const groupId = e.target.dataset.groupid;
    const oldWidth = parseInt(e.target.dataset.width, 10);
    const dividerMousemove = (event) => {
      const dX = event.clientX - oldX;
      const newWidth = oldWidth + dX;
      dispatch(setSectionWidth({ sectionId, groupId, newWidth }));
    };

    const dividerMouseup = () => {
      window.removeEventListener("mousemove", dividerMousemove);
      window.removeEventListener("mouseup", dividerMouseup);
    };
    window.addEventListener("mousemove", dividerMousemove);
    window.addEventListener("mouseup", dividerMouseup);
  };

  const selectAllItems = () => {
    const itemIds = allGroupItems.map((item) => item.id);
    dispatch(selectItemsByGroup({ groupId: id, allItemIds: itemIds }));
    document
      .querySelectorAll(`input[data-parent-id="${id}"]`)
      .forEach((checkbox) => (checkbox.checked = true));
  };

  return (
    <section
      className="table flex-col"
      style={{ borderColor: `var(--${theme}-main)` }}
    >
      <div className="table-header flex">
        <div className="table-checkbox flex-col" onClick={selectAllItems}>
          <input type="checkbox" data-parent-id={id} data-main-checkbox />
        </div>
        {groupLayout.content.map((section) => {
          const { index, width, title, type } = section;

          const showColumnDescription = (e) => {
            const { left, top } = e.target.getBoundingClientRect();
            dispatch(
              openSectionDescriptionWindow({
                coordinates: { left, top },
                section,
                groupId: id,
              })
            );
          };

          const openMenu = (e) => {
            const { left, top } = e.target.getBoundingClientRect();
            dispatch(
              openSectionSettingsMenu({
                menuType: "section-settings",
                subType: type,
                coordinates: { left, top },
                groupId: id,
                sectionId: index,
                section,
                initialInputValue: title,
              })
            );
          };
          return (
            <div
              key={index}
              className="hd-conteiner"
              style={{ position: "relative" }}
            >
              <div
                className="table-section flex"
                style={{
                  width: `${width}px`,
                  justifyContent: "space-between",
                  minWidth: type === "checkbox" && "40px",
                }}
              >
                <div
                  className="flex flex-grow-1"
                  style={{ justifyContent: "center" }}
                >
                  <div>
                    {title}
                    {type === "number" &&
                      section.unit !== "" &&
                      ` [${section.unit}]`}
                    {section.description && (
                      <button
                        className="table-header-icon"
                        onClick={showColumnDescription}
                      >
                        <Circle r="4" colour={theme} />
                      </button>
                    )}
                  </div>
                </div>
                <div
                  className="divider"
                  onMouseDown={(e) => dividerMousedown(e)}
                  data-layoutid={index}
                  data-groupid={id}
                  data-width={width}
                ></div>
              </div>
              <button className="table-header-settings" onClick={openMenu}>
                <BiDotsHorizontal />
              </button>
            </div>
          );
        })}
        <div className="table-section last">
          <button
            className={`add-plus-btn flex-col ${
              currentGroup === id &&
              menuType === "add-section" &&
              "add-plus-btn-active"
            }`}
            onClick={(e) => openAddSectionMenu(e)}
          >
            <AiOutlinePlus className="icon" />
          </button>
        </div>
      </div>
      <div className="table-items flex-col">
        {unarchievedItems.map((item) => {
          return (
            <Item
              key={item.id}
              parent={item}
              group={parent}
              groupLayout={groupLayout}
              statusList={statusList}
              setStatusList={setStatusList}
              theme={theme}
            />
          );
        })}
        {showArchieved &&
          archievedItems.map((item) => {
            return (
              <Item
                key={item.id}
                parent={item}
                group={parent}
                groupLayout={groupLayout}
                statusList={statusList}
                setStatusList={setStatusList}
                theme={theme}
              />
            );
          })}
        {!showArchieved && archievedItems.length > 0 && (
          <div
            className="table-show-archieved"
            style={{ backgroundColor: `var(--${theme}-grey)` }}
            onClick={() => setShowArchieved(true)}
          >
            Show archieved ({archievedCount})
          </div>
        )}
      </div>
      <form
        className="add-item flex-col"
        style={{ backgroundColor: `var(--${theme}-bg)` }}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="+ Add new Item..."
          value={newItemInput}
          onChange={(e) => setNewItemInput(e.target.value)}
        />
      </form>
    </section>
  );
};

export default Table;
