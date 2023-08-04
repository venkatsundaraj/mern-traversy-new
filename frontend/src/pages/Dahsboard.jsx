import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getGoals } from "../auth/goalSlice";
import { useEffect } from "react";
import { goalActions } from "../auth/goalSlice";
import { useNavigate } from "react-router-dom";
import Setgoals from "../components/Setgoals";
import GoalItem from "../components/GoalItem";

const Dashboard = function(){
    const {user} = useSelector(state=>state.auth)
    const {goals, isSuccess, isError, message, isLoading} = useSelector(state=>state.goals)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    

    useEffect(()=>{
        
        if(!user){
            navigate('/login')
        }

        if(message && isError){
            console.log(message)
        }

        
        dispatch(getGoals())

        
        return ()=>{
            console.log('reset btn')
            dispatch(goalActions.reset())
        }
        
    },[navigate, user, isError, message, dispatch])

    if(isLoading) return <h1>Loading</h1>


    return(
        <React.Fragment>
            <h1>You can set your goals here</h1>
            <h1>{user && user.name}</h1>
            <p>Set the goals</p>
            <Setgoals/>
            <section>
                {goals.length > 0 ? 
                   (
                       <div className="goals">
                    {
                    
                    goals.map(goal=>(
                        <GoalItem key={goal._id} goal={goal}/>
                    ))
                   }
                   </div>
                   ):
                (<h3>You haven't set any goals</h3>)
                }
            </section>
        </React.Fragment>
    )
}

export default Dashboard