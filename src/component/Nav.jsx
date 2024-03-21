import { Link, useNavigate } from "react-router-dom";
import style  from "../style/nav.module.css";
import { useEffect } from "react";
import {logoutUser} from "../features/user/userSlice"
import { addToCartInit } from "../features/cart/cartSlice";
import {useDispatch, useSelector } from "react-redux"
import axios from "axios";
const Nav=()=>{
    let navigate=useNavigate('http://localhost:3001')
    let goHome=()=>{
        navigate('/');
    }
    let dispatch=useDispatch()
    let user=useSelector((state)=>state.user.login)
    let cart=useSelector((state)=>state.cart.cart)
    useEffect(()=>{
        if (user){
            axios.get(`http://localhost:3000/users/${localStorage.getItem("loggedUser")}`).then((res)=>{
                // console.log(res.data.cart);
                // console.log(res.data.cart[0]);
                dispatch(addToCartInit(res.data.cart))
            }) 
        }
    },[])
    
    // console.log(cart[0]);
    return(
        <nav className={style.nav}>
            <h1 onClick={goHome}>NCart</h1>
            <form>
                {/* <input type="search" name="" id="" placeholder="Search"/>
                <button>Search</button> */}
                {user?
                <><Link to="/cart">
                    <i className="fa-solid fa-cart-shopping"></i>
                    <span className="badge badge-warning" id="lblCartCount">{cart[0]?cart[0].length:0}</span>
                </Link>
                <button type="button" onClick={()=>{
                    dispatch(logoutUser())
                    navigate("/")
                }}>
                    <i className="fa-solid fa-right-to-bracket"></i> Logout
                    </button></>:
                <><Link to="/login"><i className="fa-solid fa-right-to-bracket"></i> Login</Link></>}
                
            </form>
        </nav>
    )
}
export default Nav