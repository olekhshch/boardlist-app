const layoutA = {
  lastIndex: 3,
  content: [
    { index: "t1", type: "main", title: "Item", width: 230 },
    { index: "t2", type: "text", title: "Type of activity", width: 150 },
  ],
};

const layoutB = {
  lastIndex: 4,
  content: [
    { index: "t1", type: "main", title: "Dish", width: 250 },
    { index: "t2", type: "text", title: "Duration", width: 150 },
    {
      index: "t3",
      type: "status",
      statusId: "s1",
      title: "Is vege?",
      width: 110,
    },
  ],
};

const initialState = {
  allGroups: [
    {
      boardId: "b1",
      id: "g1",
      title: "Today",
      isCollapsed: false,
      theme: "blue",
      groupLayout: layoutA,
    },
    {
      boardId: "b1",
      id: "g3",
      title: "General",
      isCollapsed: true,
      theme: "green",
      groupLayout: layoutA,
    },
    {
      boardId: "b3",
      id: "g4",
      title: "Checked",
      isCollapsed: false,
      theme: "green",
      groupLayout: layoutB,
    },
  ],
  lastIndex: 4,
};

export default initialState;
