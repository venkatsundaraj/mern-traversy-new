const express = require('express')
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const path = require('path')
const colors = require('colors')
const PORT = process.env.PORT || 5000
const app = express()
const goalRouter = require('./router/goalRoutes')
const userRouter = require('./router/userRoutes')
const connectDB = require('./config/db')
const {errorHandler} = require('./middleware/errorMiddleware')
const cors = require('cors')

app.use(express.json())
app.use(express.urlencoded(({extended:false})))
app.use(cors())



connectDB()

app.use(goalRouter)
app.use('/admin',userRouter)

if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname,'../frontend/build')))

    app.use('*', (req,res,next)=>{
        res.sendFile(path.resolve(__dirname,'../frontend/build/index.html'))
    })
}else{
    app.use('/', (req,res,next)=>{
        res.send('Please set to production')
    })
}

app.use(errorHandler)


app.listen(PORT, ()=>{console.log(`server started at ${PORT}`)})


