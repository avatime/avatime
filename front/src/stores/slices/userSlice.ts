import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: undefined,
  userName: "",
  userGender: undefined,
  userDesc: "",
  socialId: undefined,
  socialType: undefined,
  profileImagePath: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbjG0o2%2FbtrJlz5Xgi5%2F22KkMl1kDkBWLw7lI2t5MK%2Fimg.png",
  isLogin: false,
  token: "",
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
    setToken(state, action) {
      state.token = action.payload;
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
  setToken,
} = userSlice.actions;

export default userSlice.reducer;
