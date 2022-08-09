import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: 2,
  userName: "",
  userGender: "M",
  userDesc: "",
  socialId: undefined,
  socialType: undefined,
  profileImagePath: "https://jira.ssafy.com/secure/useravatar?avatarId=10334",
  isLogin: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    reset(state) {
      Object.assign(state, initialState);
    },
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
    setSocialType(state, action) {
      state.socialType = action.payload;
    },
    setProfileImagePath(state, action) {
      state.profileImagePath = action.payload;
    },
    setIsLogin(state, action) {
      state.isLogin = action.payload;
    },
  },
});

export const {
  reset,
  setUserId,
  setUserName,
  setUserGender,
  setUserDesc,
  setSocialId,
  setSocialType,
  setProfileImagePath,
  setIsLogin,
} = userSlice.actions;

export default userSlice.reducer;
