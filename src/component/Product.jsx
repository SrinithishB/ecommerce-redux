import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import style from "../style/product.module.css"
import { addToCart } from "../features/cart/cartSlice";
import {useDispatch, useSelector } from "react-redux"
const Product=()=>{
    let dispatch=useDispatch();
    let id=useParams()
    let [data,setData]=useState([])
    useEffect(()=>{
        axios.get(`http://localhost:3000/products/${id.id}`)
            .then(response =>{
                setData(response.data)
            })
    },[id])
    return(
        <article className={style.product}>
            <section className={style.image}>
                <img src={data.image} alt="" />
            </section>
            <section className={style.data}>
                <h1>{data.name}</h1>
                <p>{data.description}</p>
                
                <div>
                <h2>{data.price}</h2>
                <div>
                    <button ><i class="fa-solid fa-cart-shopping"></i> ADD TO CART</button>
                    <button><i class="fa-solid fa-bag-shopping"></i> BUY NOW</button>
                </div>
                </div>
            </section>
        </article>
    )
}
export default Product