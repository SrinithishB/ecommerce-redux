import { useForm,Controller } from "react-hook-form"
import React, { useState } from "react"
import * as yup from 'yup'
import {yupResolver} from "@hookform/resolvers/yup"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import style from "../style/login.module.css"
import {loginUser} from "../features/user/userSlice"
import {useDispatch, useSelector } from "react-redux"

const schema = yup.object().shape({
    email:yup.string().email('enter valid email').required('email in manditory'),
    password:yup.string().required().min(4,'minimum 4 char is required')
})
const LoginForm=()=>{
    let navigate=useNavigate('http://localhost:3001')
    let dispatch=useDispatch()
    // let user=useSelector((state)=>state.user.login)
    // console.log(user);
    const {register,handleSubmit, formState:{errors,isValid,isDirty}}=useForm({
        resolver:yupResolver(schema),
        mode:'onChange'
    });
    let [users,setUsers]=useState([])
    const onSubmit=(data)=>{
        // alert(JSON.stringify(data));
        data["cart"]=[]
        delete data.confirmpassword
        axios.get("http://localhost:3000/users")
        .then((response)=>{
            setUsers(response.data)
            let user=users.filter(user=>user["email"]==data["email"] && user["password"]==data["password"]).map(x=>{
                localStorage.setItem("loggedUser", x["id"])
                dispatch(loginUser())
                console.log(x["id"]);
                navigate("/")
                
            })
            console.log(user);
            
            if (user.length==0){
                alert("Email or Passowrd is incorrect")
            }
        })
    }
    return(
        <div className={style.login}>
            <h1>Signup</h1>
            <form action="" onSubmit={handleSubmit(onSubmit)} >
                <input type="email" placeholder="Email" {...register('email')}/>
                <p>{errors.email?.message}</p>
                <input type="password" placeholder="Password" {...register('password')}/>
                <p>{errors.password?.message}</p>
                <div>
                    <input className={style.button} type="submit" disabled={isDirty && !isValid}/>
                </div>
            </form>
            <br />
            <div><Link to="/signup">Create Account!!!</Link></div>
        </div>
    )
}
export default LoginForm