import { createSlice } from "@reduxjs/toolkit";

const defaultStatus = {
  //id (s1, s2...)
  content: {
    green: "Done",
    red: "Cancelled",
    yellow: "In progress",
    default: "",
  },
};

const initialState = {
  lastIndex: 1,
  allStatuses: [],
  allParameters: [
    "green",
    "yellow",
    "orange",
    "red",
    "pink",
    "blue",
    "violet",
    "turquoise",
  ],
};

const statusesSlice = createSlice({
  name: "statuses",
  initialState,
  reducers: {
    setStatusesState: (state, { payload }) => {
      const { lastIndex, allStatuses, allParameters } = payload;
      console.log(payload);
      state.lastIndex = lastIndex;
      state.allStatuses = allStatuses;
      state.allParameters = allParameters;
    },
    addStatus: (state, { payload }) => {
      state.lastIndex += 1;
      const id = `s${state.lastIndex}`;
      const newStatus = { ...defaultStatus, id, groupId: payload };
      const newStatuses = [...state.allStatuses, newStatus];
      state.allStatuses = newStatuses;
      state.lastCreatedId = id;
    },
    changeStatusContent: (state, { payload }) => {
      const { statusId, newContent } = payload;
      const newStatuses = state.allStatuses.map((statusObj) => {
        if (statusObj.id === statusId) {
          return { ...statusObj, content: newContent };
        }
        return statusObj;
      });
      state.allStatuses = newStatuses;
    },
  },
});

export default statusesSlice.reducer;

export const { addStatus, changeStatusContent, setStatusesState } =
  statusesSlice.actions;
