import { createSlice } from "@reduxjs/toolkit";

let user=localStorage.getItem("loggedUser")
let login=user!=null?true:false
const initialState ={
    login:login
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        loginUser:(state)=>{
            state.login=true
        },
        logoutUser:(state)=>{
            state.login=false
            localStorage.removeItem('loggedUser')
            
        }
    }
})


export const {loginUser,logoutUser}=userSlice.actions;

export default userSlice.reducer