import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeValue } from "../features/items/itemsSlice";

const Cell = ({ width, value, type, itemId, sectionIndex }) => {
  const dispatch = useDispatch();

  const [cellValue, setCellValue] = useState(value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === "main" && cellValue === "") {
      setCellValue(value);
    }
    dispatch(
      changeValue({ newValue: cellValue, itemId, layoutIndex: sectionIndex })
    );
  };

  return (
    <form
      className="table-section flex-col"
      style={{ width: `${width}px` }}
      onSubmit={handleSubmit}
    >
      <input
        className="flex-grow-1"
        value={cellValue}
        onChange={(e) => setCellValue(e.target.value)}
      />
    </form>
  );
};

export default Cell;
