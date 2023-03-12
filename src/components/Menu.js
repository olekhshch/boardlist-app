import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeValue } from "../features/items/itemsSlice";
import { closeMenu } from "../features/menu/menuSlice";

const Menu = () => {
  const { coordinates, menuType, statusContent, itemId, sectionIndex } =
    useSelector((state) => state.menu);

  const dispatch = useDispatch();

  useEffect(() => {
    const closeMenuEvent = () => {
      dispatch(closeMenu());
      window.removeEventListener("click", closeMenuEvent);
    };

    document.getElementById("board").addEventListener("click", closeMenuEvent);
  }, []);

  if (menuType === "status-list") {
    const setStatus = (e) => {
      const newValue = e.target.dataset.colourValue;
      console.log(itemId + "_ _ _" + sectionIndex + "__" + newValue);
      dispatch(changeValue({ newValue, itemId, layoutIndex: sectionIndex }));
      dispatch(closeMenu());
    };

    return (
      <div
        className="board-menu flex-col"
        style={{ left: coordinates.left, top: coordinates.top }}
      >
        <div className="status-list flex-col">
          {Object.entries(statusContent).map(([colour, value]) => {
            return (
              <div
                key={colour}
                onClick={setStatus}
                data-colour-value={colour}
                className="table-section flex cell-status"
                style={{
                  width: `150px`,
                  backgroundColor: `var(--${colour}-main)`,
                }}
              >
                {value}
              </div>
            );
          })}
        </div>
        <button className="btn-secondary">Edit</button>
      </div>
    );
  }
};

export default Menu;
