import { createSlice } from "@reduxjs/toolkit";

const defaultStatus = {
  //id (s1, s2...)
  content: {
    green: "Done",
    red: "Cancelled",
    yellow: "In progress",
  },
};

const initialState = {
  lastIndex: 1,
  allStatuses: [
    {
      id: "s1",
      content: {
        green: "Done",
        red: "Cancelled",
        yellow: "In progress",
      },
    },
  ],
};

const statusesSlice = createSlice({
  name: "statuses",
  initialState,
  reducers: {
    addStatus: (state, { payload }) => {
      state.lastIndex += 1;
      const id = `s${state.lastIndex}`;
      const newStatus = { ...defaultStatus, id };
      const newStatuses = [...state.allStatuses, newStatus];
      state.allStatuses = newStatuses;
      state.lastCreatedId = id;
    },
  },
});

export default statusesSlice.reducer;

export const { addStatus } = statusesSlice.actions;
