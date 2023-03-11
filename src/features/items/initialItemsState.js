const initialState = {
  lastIndex: 6,
  allItems: [
    {
      id: "i1",
      groupId: "g1",
      content: [
        { layoutIndex: "t1", value: "Git push" },
        { layoutIndex: "t2", value: "Read, video" },
      ],
    },
    {
      id: "i2",
      groupId: "g1",
      content: [
        { layoutIndex: "t1", value: "Walk" },
        { layoutIndex: "t2", value: "Going outside" },
      ],
    },
    {
      id: "i4",
      groupId: "g4",
      content: [
        { layoutIndex: "t1", value: "Fried Rice" },
        { layoutIndex: "t2", value: "~1h" },
      ],
    },
    {
      id: "i5",
      groupId: "g4",
      content: [
        { layoutIndex: "t1", value: "Tomato eggs with rice" },
        { layoutIndex: "t2", value: "<40 min" },
      ],
    },
  ],
};

export default initialState;
