const layoutA = {
  lastIndex: 2,
  content: [
    { index: "t1", type: "main", title: "Item", width: 230 },
    { index: "t2", type: "text", title: "Type of activity", width: 150 },
  ],
};

const initialState = {
  allGroups: [
    {
      boardId: "b1",
      id: "g1",
      title: "Today",
      isCollapsed: false,
      groupLayout: layoutA,
    },
    {
      boardId: "b1",
      id: "g3",
      title: "General",
      isCollapsed: true,
      groupLayout: layoutA,
    },
    {
      boardId: "b3",
      id: "g4",
      title: "Checked",
      isCollapsed: false,
      groupLayout: layoutA,
    },
  ],
  lastIndex: 4,
};

export default initialState;
