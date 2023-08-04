import React from 'react'
import Module from './GoalItem.module.css'
import { useDispatch } from 'react-redux'
import { deleteGoal } from '../auth/goalSlice'
import { Link } from 'react-router-dom'

function GoalItem({goal}) {
    const dispatch = useDispatch()
    const deleteGoalHandler = function(){
        dispatch(deleteGoal(goal._id))
    }
    
  return (
    <div className={Module.goal}>
        <h2>{goal.goal
        }</h2>
        <button onClick={deleteGoalHandler}>Delete</button>
        <Link to={`/edit-goal/${goal._id}`}>Edit</Link>
    </div>
  )
}

export default GoalItem