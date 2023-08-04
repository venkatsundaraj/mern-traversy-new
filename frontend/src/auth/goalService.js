import axios from "axios";

const setGoals = async function(user, token){
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post('/set-goals', user, config)

    return response.data
}

const getGoals = async function(token){
    const config = {
        headers:{
            Authorization:`Bearer ${token}`
        }
    }

    const response = await axios.get('/get-goals', config)

    return response.data
}

const deleteGoal = async function(id, token){


    const config = {
        headers:{
            Authorization:`Bearer ${token}`
        }
    }

    const response = await axios.get(`/delete-goals/${id}`, config)
    
    console.log(response.data)
    return response.data
}

const updateGoal = async function(goal, token){
    const config = {
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const response = await axios.post(`/update-goals/${goal.id}`, goal, config)

    // console.log(response)

    return response.data
}

const goalService = {
    setGoals:setGoals,
    getGoals:getGoals,
    deleteGoal:deleteGoal,
    updateGoal:updateGoal
}

export default goalService