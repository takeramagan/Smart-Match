import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { hrHistoryReducer } from "../slices/hrHistorySlice";

const rootReducer = combineReducers({
  history: hrHistoryReducer
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => ([...getDefaultMiddleware()])
})