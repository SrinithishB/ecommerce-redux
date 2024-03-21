import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const cart =[]
const initialState = {
    cart
}
export const  cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addToCartInit:(state , action )=>{
            let item=[...action.payload];
            // item.count=1;
            state.cart.push(item);
            // item.count=1;
        },
        addToCart:(state,action)=>{
            state.cart[0].push(action.payload)
            axios.get(`http://localhost:3000/users/${localStorage.getItem('loggedUser')}`)
            .then((resp)=>{
                let data=resp.data
                data.cart.push(action.payload)
                // console.log(data);
                axios.put(`http://localhost:3000/users/${localStorage.getItem('loggedUser')}`,data)
                .then((resp)=>console.log(resp))
            })
            console.log(cart);
        },
        removeFromCart:(state , action)=> {
            // console.log(state.cart);
            let filter=state.cart[0].filter((value) =>value.id!==action.payload);
            state.cart[0]=filter;
            axios.get(`http://localhost:3000/users/${localStorage.getItem('loggedUser')}`)
            .then((resp)=>{
                let data=resp.data
                data.cart=filter
                console.log(data);
                axios.put(`http://localhost:3000/users/${localStorage.getItem('loggedUser')}`,data)
                .then((resp)=>console.log(resp))
            })
        }
    }
})

export const {addToCart,removeFromCart,addToCartInit}=cartSlice.actions;

export default cartSlice.reducer
export const selectAllCart=(state)=>state.cart