import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: undefined,
    userName: undefined,
    userGender: undefined,
    userDesc: undefined,
    socialId: undefined,
    token: undefined,
    profileImagePath: undefined,
  },
  reducers: {
    setUserId(state, action) {
      state.userId = action.payload;
    },
    setUserName(state, action) {
      state.userName = action.payload;
    },
    setUserGender(state, action) {
      state.userGender = action.payload;
    },
    setUserDesc(state, action) {
      state.userDesc = action.payload;
    },
    setSocialId(state, action) {
      state.socialId = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    setProfileImagePath(state, action) {
      state.profileImagePath = action.payload;
    },
  },
});

export const {
  setUserId,
  setUserName,
  setUserGender,
  setUserDesc,
  setSocialId,
  setToken,
  setProfileImagePath,
} = userSlice.actions;

export default userSlice.reducer;
