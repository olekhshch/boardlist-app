import Sidebar from "./components/Sidebar";
import ActiveBoard from "./components/ActiveBoard";
import Menu from "./components/Menu";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setItemsState } from "./features/items/itemsSlice";
import { setBoardsState } from "./features/boards/boardsSlice";
import { setGroupsState } from "./features/groups/groupsSlice";
import axios from "axios";

const App = () => {
  const { isOpen } = useSelector((state) => state.menu);
  const [isLoading, setIsLoading] = useState(true);
  const items = useSelector((state) => state.items);

  const dispatch = useDispatch();

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
    </>
  );
};

export default App;
