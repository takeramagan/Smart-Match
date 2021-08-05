import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentPage: 0,
  historyList:[]
}

const historySlice = createSlice({
  name:"historySlice",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => state.currentPage = action.payload,
    setHistoryList: (state, action) => ({...state, historyList: [...action.payload]}),
    addHistoryList: (state, action) =>  ({...state, historyList: [...state.historyList, ...action.payload]}),
    deleteHistory: (state, action) => ({...state, historyList: state.historyList.filter(item => item.id != action.payload.id )}),
  }
})

export const historyReducer =  historySlice.reducer
export const historyAction = {
  setCurrentPage: historySlice.actions.setCurrentPage,
  setHistoryList: historySlice.actions.setHistoryList,
  addHistoryList: historySlice.actions.addHistoryList,
  deleteHistory: historySlice.actions.deleteHistory
}