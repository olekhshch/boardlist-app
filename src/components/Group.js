import { useSelector, useDispatch } from "react-redux";

const Group = ({ group }) => {
  const { title } = group;
  return (
    <>
      <div className="flex">
        <form>
          <input
            className="group-title blue-main-font"
            value={title}
            readOnly
          />
        </form>
        <div className="group-buttons">
          <button>Settings</button>
        </div>
      </div>
      <section>Table</section>
    </>
  );
};

export default Group;
