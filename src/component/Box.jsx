import { useNavigate } from 'react-router-dom'
import style from '../style/container.module.css'
import { addToCart } from "../features/cart/cartSlice";
import {useDispatch, useSelector } from "react-redux"
// import image from '../image/buds.png'
const Box=(x)=>{
    let dispatch=useDispatch()
    let data=x.data
    const navigation=useNavigate("http://localhost:3000/products")
    let openProduct=()=>{
        navigation(`/${data.id}`)
    }
    return(
        <article className={style.box} >
            <div className={style.image} onClick={openProduct}>
            <img src={data.image} alt="" srcSet="" />
            </div>
            <div className={style.content}>
            <p>{data.name}</p>
            <div>
                <h2>{data.price}</h2>
                <button onClick={()=>dispatch(addToCart(data))}>Add to cart</button>
            </div>
            </div>
        </article>
    )
}
export default Box