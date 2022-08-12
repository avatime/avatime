import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import userReducer from "./slices/userSlice";
import meetingSlice from "./slices/meetingSlice";
import waitingSlice from "./slices/waitingSlice";

const reducers = combineReducers({
  user: userReducer,
  meeting: meetingSlice,
  waiting: waitingSlice,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
