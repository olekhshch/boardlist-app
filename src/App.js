import Sidebar from "./components/Sidebar";
import ActiveBoard from "./components/ActiveBoard";
import Menu from "./components/Menu";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setItemsState } from "./features/items/itemsSlice";
import { setBoardsState } from "./features/boards/boardsSlice";
import { setGroupsState } from "./features/groups/groupsSlice";
import axios from "axios";
import ItemSelectedModal from "./components/ItemSelectedModal";

const App = () => {
  const { isOpen } = useSelector((state) => state.menu);
  const { selectedItems } = useSelector((state) => state.system);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div> Loading... </div>;
  }

  return (
    <>
      <Sidebar />
      <ActiveBoard />
      {isOpen && <Menu />}
      {Object.keys(selectedItems).length !== 0 && <ItemSelectedModal />}
    </>
  );
};

export default App;
