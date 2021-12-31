import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios custom hook
import { useRequest } from "../hooks/useRequest";

// fetch VIP state of user
// export const fetchHrVIPState = createAsyncThunk('users/fetchVIPStatus',
//     async ({ email }, thunkAPI) => {
//         console.log("Fetch VIP state", userEmail);
//         // const HttpClient = useRequest();
//         // const data = new FormData();
//         // data.append('dcc', X_API_KEY_B_AND_C);
//         // data.append('hrid', hrId);

//         // const config = {
//         //     method: 'post',
//         //     url: APP_END_POINT_B_AND_C + 'get_all_job_postings',
//         //     data: data
//         // };
//         // const response = await HttpClient.requestHandler(config);
//         return true
//     }
// );

const hrVIPStateSlice = createSlice({
    name: "hrVIPStateSlice",
    initialState: { isVIP: false },
    reducers: {
        setVIPState: (state, action) => void (state.isVIP = action.payload),
    },
    // extraReducers: (builder) => {
    //     // Add reducers for additional action types here, and handle loading state as needed
    //     builder.addCase(fetchHrVIPState.fulfilled, (state, action) => {
    //         state.isVIP = action.payload;
    //     })
    // },
})

export const hrVIPStateReducer = hrVIPStateSlice.reducer
export const hrVIPStateAction = {
    setVIPState: hrVIPStateSlice.actions.setVIPState,
}