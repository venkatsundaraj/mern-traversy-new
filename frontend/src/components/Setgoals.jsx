import React,{useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createGoal } from '../auth/goalSlice'

function Setgoals() {
    const [goalValue, setGoalValue] = useState()
    const dispatch = useDispatch()


    const formSubmitHandler = function(e){
        e.preventDefault()
        console.log(goalValue)
        dispatch(createGoal({goal:goalValue}))
        setGoalValue('')
    }
  return (
    <form onSubmit={formSubmitHandler}>
        <input type='text' value={goalValue} onChange={e=>{setGoalValue(e.target.value)}}/>
        <button style={{width:'100px'}} type='submit' >Add</button>
    </form>
  )
}   

export default Setgoals