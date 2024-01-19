import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE={
   username: '',
   email: ''
}

export const userSlice=createSlice({
    name:"user",
    initialState:INITIAL_STATE,
    reducers:{
        updateUser:(state: { username: any; email: any; },action: { payload: { username: any; email: any; }; })=>{
            state.username=action.payload.username
            state.email=action.payload.email
        }
    }
})

export const {updateUser} =userSlice.actions
export default userSlice.reducer