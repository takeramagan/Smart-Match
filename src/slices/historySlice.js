import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentPage: 0,
  historyList:[]
}

export const historySlice = createSlice({
  name:"historySlice",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => state.currentPage = action.payload,
    addHistoryList: (state, action) => { return [...state.historyList, ...action.payload]},
    deleteHistory: (state, action) => {return state.historyList.filter(item => item.id != action.payload.id )},
  }
})

export const historyReducer =  historySlice.reducer