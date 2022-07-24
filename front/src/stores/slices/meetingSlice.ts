import { createSlice } from "@reduxjs/toolkit";

const meetingSlice = createSlice({
  name: "meeting",
  initialState: {
    roomId: 0,
    headCount: 8,
  },
  reducers: {},
});

export default meetingSlice.reducer;
