const initialState = {
  lastIndex: 11,
  allItems: [
    {
      id: "i1",
      groupId: "g1",
      content: [
        { layoutIndex: "t1", value: "Git push" },
        { layoutIndex: "t2", value: "Read, video" },
      ],
      lastNoteIndex: 4,
      notes: [],
    },
    {
      id: "i2",
      groupId: "g1",
      content: [
        { layoutIndex: "t1", value: "Walk" },
        { layoutIndex: "t2", value: "Going outside" },
      ],
      lastNoteIndex: 4,
      notes: [],
    },
    {
      id: "i4",
      groupId: "g4",
      content: [
        { layoutIndex: "t1", value: "Fried Rice" },
        { layoutIndex: "t2", value: "~1h" },
        { layoutIndex: "t3", value: "green", type: "status" },
      ],
      lastNoteIndex: 4,
      notes: [
        {
          header: "Ingridients",
          content: "Soy sauce, rice, chicken",
          isPinned: false,
        },
        {
          header: "Prep",
          content: "Cook the rice 1 night before the actual cooking",
          isPinned: true,
        },
      ],
    },
    {
      id: "i5",
      groupId: "g4",
      content: [
        { layoutIndex: "t1", value: "Tomato eggs with rice" },
        { layoutIndex: "t2", value: "<40 min" },
        { layoutIndex: "t3", value: "red", type: "status" },
      ],
      lastNoteIndex: 4,
      notes: [],
    },
    {
      id: "i7",
      groupId: "g3",
      content: [
        { layoutIndex: "t1", value: "Canada visa" },
        { layoutIndex: "t2", value: "Documents" },
      ],
      lastNoteIndex: 4,
      notes: [],
    },
  ],
};

export default initialState;
