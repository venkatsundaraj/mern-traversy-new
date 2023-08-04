import React from "react";
import { useState, useEffect } from "react";
import Module from './Register.module.css'
import {useSelector, useDispatch} from 'react-redux'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { authSliceActions, register } from "../auth/authSlice";

const Register = function(){
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const dispatch  = useDispatch()
    const navigate = useNavigate()
    const {isLoading, message, isError, isSuccess, user} = useSelector(state=>state.auth)

    useEffect(()=>{
        if(isError){
            toast.error(message)
        }
        if(isSuccess || user){
            navigate('/')
        }
        dispatch(authSliceActions.reset())

        

    },[user, isError, isSuccess, message, navigate, dispatch])
    
    
    const formSubmitHandler = function(e){
        e.preventDefault()

        const inputs = {name:name,email:email,password:password}
        
       
        if(password !== confirmPassword){
            toast.error("password do not match")
        }else{
            dispatch(register(inputs))
        }
    }

    if(isLoading) return <h1>Loading...</h1>


    return(
        <div className={Module.container}>
        <form onSubmit={formSubmitHandler}>
            <h1>Register the form</h1>
            <div>
                <input type="text" name="name" placeholder="name" value={name} onChange={(e)=>setName(e.target.value)}/>
            </div>
            <div>
                <input type="text" name="email" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div>
                <input type="text" name="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <div>
                <input type="text" name="confirmPassword" value={confirmPassword} placeholder="confirmPassword" onChange={(e)=>setConfirmPassword(e.target.value)}/>
            </div>
            <button type="submit">Register</button>
        </form>
        </div>
    )
}

export default Register