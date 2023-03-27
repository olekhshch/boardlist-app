import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { renameGroup, renameSection } from "../../features/groups/groupsSlice";
import { closeMenu } from "../../features/menu/menuSlice";

const SectionRenameMenu = () => {
  const { initialInputValue, coordinates, groupId, sectionId } = useSelector(
    (state) => state.menu
  );

  const [newTitle, setNewTitle] = useState(initialInputValue);
  const dispatch = useDispatch();

  const inputEl = useRef(null);

  const handleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTitle !== "") {
      dispatch(renameSection({ newTitle, groupId, sectionId }));
    }
    dispatch(closeMenu());
  };

  useEffect(() => {
    inputEl.current.focus();
    inputEl.current.select();
  }, []);

  return (
    <div
      className="menu flex-col"
      style={{ gap: "6px", left: coordinates.left, top: coordinates.top }}
    >
      <form onSubmit={handleSubmit}>
        <input
          ref={inputEl}
          placeholder="Can't be empty"
          value={newTitle}
          onChange={handleChange}
          style={{ marginTop: "4px", fontSize: "1.15em" }}
        />
      </form>
      <div className="flex" style={{ gap: "8px" }}>
        <button className="btn-main blue-main" onClick={handleSubmit}>
          Confirm
        </button>
        <button className="btn-secondary" onClick={() => dispatch(closeMenu())}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SectionRenameMenu;
