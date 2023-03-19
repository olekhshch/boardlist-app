import { useSelector, useDispatch } from "react-redux";
import { addSectionToItem } from "../features/items/itemsSlice";
import { openItemWindow } from "../features/menu/menuSlice";
import Cell from "./Cell";

const Item = ({ parent, groupLayout, statusList, setStatusList }) => {
  const { id, content } = parent;
  const dispatch = useDispatch();

  const openWindow = () => {
    dispatch(openItemWindow({ item: parent }));
  };

  return (
    <div className="item flex">
      {groupLayout.content.map((section) => {
        const { index, type, width, statusId } = section;
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
