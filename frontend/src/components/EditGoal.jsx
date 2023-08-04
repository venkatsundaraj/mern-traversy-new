import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { goalActions } from "../auth/goalSlice";
import { useDispatch, useSelector } from "react-redux";
import { updateGoal } from "../auth/goalSlice";

const EditGoal = function(){
    const [inputValue, setInputValue] = useState('')
    const {id} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {goals, isSuccess, isError, message, isLoading} = useSelector(state=>state.goals)

  console.log('good')

    useEffect(()=>{ 
       const filteredGoal = goals.find(goal=>goal._id.toString()===id.toString())

       setInputValue(filteredGoal?.goal)
       
      
       if(isError){
        console.log(message)
       }

    },[dispatch, isError, message])

    const inputChangeHandler = function(e){
       setInputValue(e.target.value)
    }
    
    const formSubmitHandler = function(e){
        e.preventDefault()
        dispatch(updateGoal({goal:inputValue, id:id}))
        if(isSuccess) navigate('/')
    }

    if(isLoading) return (<h1>Loading...</h1>)

    return(
        <form onSubmit={formSubmitHandler}>
        <input type="text" value={inputValue} onChange={inputChangeHandler}/>
        <button style={{width:"100px"}} type="submit">Edit</button>
        </form>
    )
}

export default EditGoal