import Sidebar from "./components/Sidebar";
import ActiveBoard from "./components/ActiveBoard";
import Menu from "./components/Menu";
import { useSelector } from "react-redux";

const App = () => {
  const { isOpen } = useSelector((state) => state.menu);
  return (
    <>
      <Sidebar />
      <ActiveBoard />
      {isOpen && <Menu />}
    </>
  );
};

export default App;
