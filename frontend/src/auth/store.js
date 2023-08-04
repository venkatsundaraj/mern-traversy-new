import {configureStore} from '@reduxjs/toolkit'
import authSliceReducer from './authSlice'
import goalSlice from './goalSlice'

const store = configureStore({
    reducer:{
        auth:authSliceReducer.reducer,
        goals:goalSlice.reducer
    }
})


export default store