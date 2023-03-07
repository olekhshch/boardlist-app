import Header from "./Header";
import BoardContent from "./BoardContent";

const ActiveBoard = () => {
  return (
    <div id="board" className="flex-grow-1">
      <Header />
      <BoardContent />
    </div>
  );
};

export default ActiveBoard;
