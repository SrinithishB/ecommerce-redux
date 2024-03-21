import style from '../style/container.module.css'
import Box from './Box'
import axios from 'axios'
import { useEffect, useState } from 'react'
const Container=()=>{
    let [products,setProducts]=useState([]);
    useEffect(()=>{
        axios.get("http://localhost:3000/products").then((res)=>{
            setProducts(res.data)
        })
    },[])

    return(
        <section className={style.container}>
            {
                products.map((item)=>(
                    <Box key={item.id} data={item} />
                ))
            }
        </section>
    )
}
export default Container