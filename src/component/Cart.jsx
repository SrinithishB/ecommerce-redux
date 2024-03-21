import style from "../style/cart.module.css"
import { removeFromCart } from "../features/cart/cartSlice";
import {useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
const Cart=()=>{
    let cartIds=useSelector(((state)=>state.cart.cart))
    // console.log(cartIds[0]);

    const dispatch = useDispatch();
    const navigation=useNavigate("http://localhost:3000/products")

    return(
        <div className={style.cart}>
            <h1>Cart</h1>
            {
                cartIds[0]?cartIds[0].map((data)=>{
                    return(
                        <article key={data.id} className={style.box} >
                        <div className={style.image} onClick={()=>{
                            navigation(`/${data.id}`)
                        }}>
                        <img src={data.image} alt="" srcSet="" />
                        </div>
                        <div className={style.content}>
                        <p>{data.name}</p>
                        <div>
                        <h2>{data.price}</h2>
                            <button onClick={
                                ()=>{
                                    dispatch(removeFromCart(data.id))
                                }
                            }>Remove</button>
                            <button onClick={()=>{
                                alert("Order Placed Successfully...")
                            }}>Buy</button>
                        </div>
                        </div>
        </article>
                    )
                }):<div>No Items in the cart</div>
            }
        </div>
    )
}
export default Cart