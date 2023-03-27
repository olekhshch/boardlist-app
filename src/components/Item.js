import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addSectionToItem } from "../features/items/itemsSlice";
import { openItemWindow } from "../features/menu/menuSlice";
import { addSelectedItem } from "../features/system/systemSlice";
import Cell from "./Cell";

const Item = ({ parent, groupLayout, statusList, setStatusList }) => {
  const { id, content, groupId } = parent;
  const dispatch = useDispatch();
  const checkboxEl = useRef(null);

  const openWindow = () => {
    dispatch(openItemWindow({ item: parent }));
  };

  const handleCheck = () => {
    const isSelected = checkboxEl.current.checked;

    if (isSelected) {
      dispatch(addSelectedItem({ itemId: id, groupId }));
    }
  };

  return (
    <div className="item flex">
      <div className="table-checkbox flex-col">
        <input type="checkbox" ref={checkboxEl} onClick={handleCheck} />
      </div>
      {groupLayout.content.map((section) => {
        const { index, type, width, statusId, increment } = section;
        const value =
          content.find((section) => section.layoutIndex === index).value ?? "";
        return (
          <Cell
            key={index}
            width={width}
            value={value}
            type={type}
            itemId={id}
            sectionIndex={index}
            increment={increment}
            statusId={statusId}
            statusList={statusList}
            setStatusList={setStatusList}
          />
        );
      })}
      <div className="table-section last" onClick={openWindow}></div>
    </div>
  );
};

export default Item;
