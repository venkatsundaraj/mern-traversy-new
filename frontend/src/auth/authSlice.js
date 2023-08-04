import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import  authService  from './authService'


const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user:user ? user : '',
    isLoading:false,
    isError:false,
    isSuccess:false,    
    message:''
}
//Say hello
export const register = createAsyncThunk('admin/register',
    async (user,thunkAPI)=>{
        try{
            return await authService.register(user)
        }catch(err){
            const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
           return thunkAPI.rejectWithValue(message)
        }
    }
)


export const logout = createAsyncThunk('admin/logout', async ()=>{
        return await authService.logout()
})

export const login = createAsyncThunk('admin/login',async(user, thunkAPI)=>{
    try{
        const data = await authService.login(user)
        // console.log(data)
        return data
    }catch(err){
        // console.log(message)
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

const authSliceReducer = createSlice({
    name:'auth',
    initialState:initialState,
    reducers:{
        reset:(state)=>{
                state.isLoading = false
                state.isError = false
                state.isSuccess = false
                state.message = ''
        }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(register.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(register.fulfilled,(state, action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(register.rejected,(state,action)=>{
                state.isLoading = false
                state.user = null
                state.message = action.payload
                state.isError = true
            })  
            .addCase(logout.fulfilled,(state)=>{
                state.user = null
            })
            .addCase(login.pending,(state,action)=>{
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action)=>{
                state.isLoading = false
                state.isError = false
                 state.isSuccess = true
                state.user = action.payload
            })
            .addCase(login.rejected,(state, action)=>{
                state.isLoading = false
                state.user = null
                state.isError = true
                state.message = action.payload
            })
            
    }
})

export const authSliceActions = authSliceReducer.actions
export default authSliceReducer
