import React from "react";
import { useState, useEffect } from "react";
import Module from './Register.module.css'
import { useSelector, useDispatch } from "react-redux";
import { authSliceActions } from "../auth/authSlice";
import { login } from "../auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = function () {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const { isError, isSuccess, user, isLoading, message } = useSelector(state => state.auth)

    console.log('login')
    useEffect(() => {

        if (isError) {
            toast.error(message)
        }
        if (isSuccess || user) {
            navigate('/')
        }

        dispatch(authSliceActions.reset())


        console.log(user, isError, isSuccess, message, navigate, dispatch)

    }, [user, isError, isSuccess, message, navigate, dispatch])



    const formSubmitHandler = function (e) {
        e.preventDefault()
        const formValue = { email: email, password: password }
        dispatch(login(formValue))
    }
    // console.log('global')

    if (isLoading) return (<h1>Loading</h1>)
    if (message) return (<p>{message}</p>)

    return (
        <div className={Module.container}>
            <form onSubmit={formSubmitHandler}>
                <h1>Login to set the goals Hello</h1>
                <div>
                    <input type="text" name="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <input type="text" name="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login