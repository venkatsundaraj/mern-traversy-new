import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import goalService from "./goalService";


const initialState = {
    goals:[],
    isError:false,
    isSuccess:false,
    message:'',
    isLoading:false
}

export const createGoal = createAsyncThunk('goal/setgoal',async function(goalData, thunkAPI){
    try{
        const token = thunkAPI.getState().auth.user.token

        return await goalService.setGoals(goalData, token)
    }catch(err){
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const getGoals = createAsyncThunk('goals/getgoal',async function(_,thunkAPI){
    try{
        const token = thunkAPI.getState().auth.user.token
        // console.log(token)
        return await goalService.getGoals(token)
    }catch(err){
         const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
         return thunkAPI.rejectWithValue(message)
    }
})

export const deleteGoal = createAsyncThunk('goals/deletegoal', async function(id, thunkAPI){
    try{
        const token = thunkAPI.getState().auth.user.token
        return await goalService.deleteGoal(id, token)
    }catch(err){
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
         return thunkAPI.rejectWithValue(message)
    }
})

export const updateGoal = createAsyncThunk('goals/update-goal', async function(goal, thunkAPI){
    try{
        const token = thunkAPI.getState().auth.user.token
        
        return await goalService.updateGoal(goal, token)
    }catch(err){
         const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
         return thunkAPI.rejectWithValue(message)
    }
})

const goalSlice = createSlice({
    name:'goals',
    initialState:initialState,
    reducers:{
        reset:(state)=>{
            state = {...initialState, goals:state.goals}
        }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(createGoal.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(createGoal.fulfilled,(state, action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.goals.push(action.payload)
            })
            .addCase(createGoal.rejected,(state, action)=>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getGoals.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(getGoals.fulfilled,(state, action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.goals = action.payload
            })
            .addCase(getGoals.rejected,(state, action)=>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
             .addCase(deleteGoal.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(deleteGoal.fulfilled,(state, action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.goals = state.goals.filter(goal=>goal._id !== action.payload.id)
            })
            .addCase(deleteGoal.rejected,(state, action)=>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
             .addCase(updateGoal.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(updateGoal.fulfilled,(state, action)=>{
                state.isLoading = false
                state.isSuccess = true
                const updatedGoalIndex = state.goals.findIndex(goal=>goal._id===action.payload._id)

                const allGoals = [...state.goals]
                console.log(allGoals, action.payload)
                allGoals[updatedGoalIndex] = action.payload

                state.goals = allGoals
            })
            .addCase(updateGoal.rejected,(state, action)=>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export default goalSlice
export const goalActions = goalSlice.actions