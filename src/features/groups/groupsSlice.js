import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allGroups: [
    {
      boardId: "b1",
      id: "g1",
      title: "Initial group",
    },
  ],
  lastIndex: 2,
};

const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    addGroup: (state, { payload }) => {
      console.log(payload);
      state.lastIndex += 1;
      const id = `g${state.lastIndex}`;
      const boardId = payload.boardId;
      const title = payload.title ? payload.title : "New group";
      state.allGroups = [...state.allGroups, { id, boardId, title }];
    },
  },
});

export default groupsSlice.reducer;

export const { addGroup } = groupsSlice.actions;
