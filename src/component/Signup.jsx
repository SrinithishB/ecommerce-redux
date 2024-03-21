import { useForm,Controller } from "react-hook-form"
import React from "react"
import * as yup from 'yup'
import {yupResolver} from "@hookform/resolvers/yup"
import axios from "axios"
import style from "../style/login.module.css"
import { useNavigate } from "react-router-dom"
const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email:yup.string().email('enter valid email').required('email in manditory'),
    password:yup.string().required().min(4,'minimum 4 char is required'),
    confirmpassword:yup.string().oneOf([yup.ref("password"),"Password does not matched"]),
    agree:yup.boolean(true).oneOf([true],'agree to terms and conditions')
})
const Signup=()=>{
    let navigate=useNavigate('http://localhost:3001')
    
    const {register,handleSubmit, formState:{errors,isValid,isDirty}}=useForm({
        resolver:yupResolver(schema),
        mode:'onChange'
    });
    console.log(errors);
    const onSubmit=(data)=>{
        // alert(JSON.stringify(data));
        data["cart"]=[]
        delete data.confirmpassword
        // console.log(JSON.stringify(data));
        axios.post("http://localhost:3000/users",JSON.stringify(data))
        .then((response)=>{
            console.log(response);
            navigate('/login')
        })
    }
    return(
        <div className={style.signup}>
            <h1>Signup</h1>
            <form action="" onSubmit={handleSubmit(onSubmit)} >
                <input type="text" placeholder="Name" {...register('name')}/>
                <p>{errors.name?.message}</p>
                <input type="email" placeholder="Email" {...register('email')}/>
                <p>{errors.email?.message}</p>
                <input type="password" placeholder="Password" {...register('password')}/>
                <p>{errors.password?.message}</p>
                <input type="password" placeholder="Confirm Password" {...register('confirmpassword')}/>
                <p>{errors.confirmpassword?.message}</p>
                <div className={style.checkbox}>
                <input type="checkbox" name="agree" id="" {...register('agree')}/>
                <label htmlFor="agree">Agree</label>
                </div>
                <p>{errors.agree?.message}</p>
                <div>
                    <input className={style.button} type="submit" disabled={isDirty && !isValid}/>
                </div>
            </form>
        </div>
    )
}
export default Signup