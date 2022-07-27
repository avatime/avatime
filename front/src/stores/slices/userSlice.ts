import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: undefined,
    userName: "",
    userGender: undefined,
    userDesc: "",
    socialId: undefined,
    socialType: undefined,
    profileImagePath: "https://jira.ssafy.com/secure/useravatar?avatarId=10334",
    needRegister : false,
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
    setSocialType(state, action) {
      state.socialType = action.payload;
    },
    setProfileImagePath(state, action) {
      state.profileImagePath = action.payload;
    },
    setNeedRegister(state, action) {
      state.needRegister = action.payload;
    }
  },
});

export const {
  setUserId,
  setUserName,
  setUserGender,
  setUserDesc,
  setSocialId,
  setSocialType,
  setProfileImagePath,
  setNeedRegister,
} = userSlice.actions;

export default userSlice.reducer;
