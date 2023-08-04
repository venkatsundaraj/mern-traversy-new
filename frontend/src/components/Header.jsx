import React from "react";
import Module from './Header.module.css'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import { logout } from "../auth/authSlice";

const Header = function(){
    const {user} = useSelector(state=>state.auth)
    const dispatch = useDispatch()

    const userLogoutHandler = function(){
        dispatch(logout())
    }

    return (
        <header className={Module.header}>
            <ul>
                <li><Link className={module.links} to="/">GoalSetter</Link></li>
                {(user) ? 
                <>
                <button className={module.links} onClick={userLogoutHandler}>Logout</button>
                </>
                :
                <>
                <li><Link className={module.links} to="/login">Login</Link></li>
                <li><Link className={module.links} to="/register">Register</Link></li>
                </>
            }
            </ul>
        </header>
    )
}

export default Header