import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addSectionToItem } from "../features/items/itemsSlice";
import { openItemWindow } from "../features/menu/menuSlice";
import { addSelectedItem, unselectItem } from "../features/system/systemSlice";
import Cell from "./Cell";

const Item = ({
  parent,
  group,
  groupLayout,
  statusList,
  setStatusList,
  theme,
}) => {
  const { id, content, groupId, isArchieved } = parent;
  const { selectedItems } = useSelector((state) => state.system);
  const dispatch = useDispatch();
  const checkboxEl = useRef(null);

  const openWindow = () => {
    dispatch(openItemWindow({ item: parent, group }));
  };

  const handleCheck = () => {
    if (checkboxEl.current.checked) {
      dispatch(addSelectedItem({ itemId: id, groupId }));
    } else {
      dispatch(unselectItem({ itemId: id, groupId }));
    }
    document.querySelector(
      `input[data-parent-id="${groupId}"][data-main-checkbox]`
    ).checked = false;
  };

  return (
    <div className="item flex">
      <div className="table-checkbox flex-col">
        <input
          type="checkbox"
          ref={checkboxEl}
          data-parent-id={groupId}
          onClick={handleCheck}
        />
      </div>
      {groupLayout.content.map((section) => {
        const { index, title, type, width, statusId, increment, isCollapsed } =
          section;
        const value =
          content.find((section) => section.layoutIndex === index).value ?? "";
        return (
          <Cell
            key={index}
            width={width}
            value={value}
            isCollapsed={isCollapsed}
            type={type}
            itemId={id}
            sectionIndex={index}
            increment={increment}
            statusId={statusId}
            statusList={statusList}
            setStatusList={setStatusList}
            theme={theme}
            isArchieved={isArchieved}
            item={parent}
            group={group}
            sectionTitle={title}
          />
        );
      })}
      <div className="table-section last" onClick={openWindow}></div>
    </div>
  );
};

export default Item;
