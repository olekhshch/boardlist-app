import { useSelector, useDispatch } from "react-redux";
import Item from "./Item";
import { addItem } from "../features/items/itemsSlice";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { setSectionWidth } from "../features/groups/groupsSlice";

const Table = ({
  parent,
  setIsMenuOpen,
  currentGroup,
  setCurrentGroup,
  setMenuCoordinates,
  setMenuType,
  menuType,
}) => {
  const { groupLayout, id, theme } = parent;
  const { allItems } = useSelector((state) => state.items);
  const groupItems = allItems.filter((item) => item.groupId === id);
  console.log(allItems);
  console.log(groupLayout);
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
    e.preventDefault();
    setMenuType("add-section");
    setCurrentGroup(id);
    const { left, top } = e.target.getBoundingClientRect();
    setMenuCoordinates({ left: left + 16, top });
    setIsMenuOpen(true);
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

  return (
    <section
      className="table flex-col"
      style={{ borderColor: `var(--${theme}-main)` }}
    >
      <div className="table-header flex">
        {groupLayout.content.map((section) => {
          const { index, width, title } = section;
          return (
            <div
              key={index}
              className="table-section flex"
              style={{ width: `${width}px` }}
            >
              <div className="flex-grow-1">{title}</div>
              <div
                className="divider"
                onMouseDown={(e) => dividerMousedown(e)}
                data-layoutid={index}
                data-groupid={id}
                data-width={width}
              ></div>
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
        {groupItems.map((item) => {
          return <Item key={item.id} parent={item} groupLayout={groupLayout} />;
        })}
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
