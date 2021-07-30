import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { historyReducer } from "../slices/historySlice";

const rootReducer = combineReducers({
  history: historyReducer
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => ([...getDefaultMiddleware()])
})