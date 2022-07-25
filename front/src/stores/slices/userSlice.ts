import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: undefined,
    userName: undefined,
    token: undefined,
    profileImagePath: undefined,
  },
  reducers: {
    setUserId(state, action) {
      state.userId = action.payload;
    },
  },
});

export const {setUserId} = userSlice.actions;

export default userSlice.reducer;
