import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { hrHistoryReducer } from "../slices/hrHistorySlice";
import { hrVIPStateReducer } from "../slices/hrVIPStateSlice";

const rootReducer = combineReducers({
  history: hrHistoryReducer,
  VIP: hrVIPStateReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.ENV_FLAG === "development",
  middleware: (getDefaultMiddleware) => ([...getDefaultMiddleware()])
})