import { useSelector, useDispatch } from "react-redux";
import { addSectionToItem } from "../features/items/itemsSlice";
import Cell from "./Cell";

const Item = ({ parent, groupLayout }) => {
  const { id, content } = parent;
  const dispatch = useDispatch();

  console.log(groupLayout.content);
  console.log(parent);
  return (
    <div className="item flex">
      {groupLayout.content.map((section) => {
        const { index, type, width } = section;
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
          />
        );
      })}
      <div className="table-section last"></div>
    </div>
  );
};

export default Item;
