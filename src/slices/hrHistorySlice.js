import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentPage: 0,
  historyList:[]
}

const hrHistorySlice = createSlice({
  name:"hrHistorySlice",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => state.currentPage = action.payload,
    setHistoryList: (state, action) => ({...state, historyList: [...action.payload]}),
    addHistoryList: (state, action) =>  ({...state, historyList: [...state.historyList, ...action.payload]}),
    deleteHistory: (state, action) => ({...state, historyList: state.historyList.filter(item => item.id != action.payload.id )}),
  }
})

export const hrHistoryReducer =  hrHistorySlice.reducer
export const hrHistoryAction = {
  setCurrentPage: hrHistorySlice.actions.setCurrentPage,
  setHistoryList: hrHistorySlice.actions.setHistoryList,
  addHistoryList: hrHistorySlice.actions.addHistoryList,
  deleteHistory: hrHistorySlice.actions.deleteHistory
}