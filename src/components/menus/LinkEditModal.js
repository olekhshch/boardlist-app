import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLinkValue } from "../../features/items/itemsSlice";
import { closeMenu } from "../../features/menu/menuSlice";

const LinkEditModal = () => {
  const { coordinates, itemId, value, link, sectionId } = useSelector(
    (state) => state.menu
  );

  const dispatch = useDispatch();

  const [linkName, setLinkName] = useState(value);
  const [linkURL, setLinkURL] = useState(link);

  const handleNameChange = (e) => {
    setLinkName(e.target.value);
  };

  const handleURLChange = (e) => {
    setLinkURL(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (linkName.trim() !== "" && linkURL.trim() !== "") {
      dispatch(
        setLinkValue({
          itemId,
          layoutIndex: sectionId,
          newValue: linkName,
          newLink: linkURL,
        })
      );
      dispatch(closeMenu());
    }
  };

  const removeLink = (e) => {
    e.preventDefault();
    dispatch(
      setLinkValue({
        itemId,
        layoutIndex: sectionId,
        newValue: "",
        newLink: "",
      })
    );
    dispatch(closeMenu());
  };

  return (
    <div
      className="menu"
      style={{ left: coordinates.left, top: coordinates.top }}
    >
      <form className="flex-col" onSubmit={handleSubmit}>
        <label className="flex-col">
          Name
          <input value={linkName} onChange={handleNameChange} />
        </label>
        <label className="flex-col">
          Link
          <input value={linkURL} onChange={handleURLChange} />
        </label>
        <div className="flex" style={{ justifyContent: "right" }}>
          <button className="btn-secondary" onClick={removeLink}>
            Remove
          </button>
          <input type="submit" value="OK" className="btn-main blue-main" />
        </div>
      </form>
    </div>
  );
};

export default LinkEditModal;
