import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE={
   username: '',
   email: ''
}

export const userSlice=createSlice({
    name:"user",
    initialState:INITIAL_STATE,
    reducers:{
        updateUser:(state: { username: string; email: string; },action: { payload: { username: string; email: string; }; })=>{
            state.username=action.payload.username
            state.email=action.payload.email
        }
    }
})

export const {updateUser} =userSlice.actions
export default userSlice.reducer