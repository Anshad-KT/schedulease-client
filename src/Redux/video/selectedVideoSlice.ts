import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
   streamKey: "" // Array to store multiple user objects
};

export const selectedVideoSlice = createSlice({
  name: "selectedVideo",
  initialState: INITIAL_STATE,
  reducers: {
    selectedVideo: (state, action) => {
        return { ...state, streamKey: action.payload };
    }
  }
});

export const { selectedVideo } = selectedVideoSlice.actions;
export default selectedVideoSlice.reducer;
