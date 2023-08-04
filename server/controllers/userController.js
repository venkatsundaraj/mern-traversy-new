const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModels')


const getJWTToken = function(id){
    return jwt.sign({id:id}, process.env.JWT_SECRET,{
        expiresIn:'30d'
    })
}





exports.registerHandler  = asyncHandler(async (req,res,next)=>{
    try{
        const {name, email, password} = req.body

    if(!name || !email || !password){
        return res.status(400).json({message:'please enter valid details'})
    }
    const existedUser  = await User.findOne({email:email})

    if(existedUser){
        return res.status(404).json({message:'user already exists'})
    }

    const encryptedPassword = await bcrypt.hash(password, 14)


    const newUser = await User.create({
        email:email,
        password:encryptedPassword,
        name:name
    })

    console.log(newUser)

    if(newUser){

        const createdUser = {
        email:newUser.email,
        password:newUser.password,
        name:newUser.name, 
        token:getJWTToken(newUser._id)
    }

        return res.status(201).json(createdUser)
    }else{
        res.status(400)
        throw new Error('invalid credentials')
    }
    }catch(err){
        throw new Error(err)
    }

})





exports.logninHandler  = asyncHandler(async (req,res,next)=>{
    try{
        console.log(req.body)
        const {email, password} = req.body

    if(!email || !password){
        return res.status(400).json({message:'please enter password and email'})
    }
    const existedUser = await User.findOne({email:email})

    if(!existedUser){
        return res.status(400).json({message:'user not existed'})
    }


    const decryptedPassword = await bcrypt.compare(password, existedUser.password)

    if(decryptedPassword){
    const loggedUser = {
        email:existedUser.email,
        password:existedUser.password,
        name:existedUser.name, 
        token:getJWTToken(existedUser._id)
    }

   
        return res.status(200).json(loggedUser)
    }else{
        res.status(400)
        throw new Error('please enter valid password')
    }
   }catch(err){
        throw new Error(err)
    }

})






exports.getMeHandler  = asyncHandler(async (req,res,next)=>{
    const {_id, name, email} = await User.findById(req.user._id)

    return res.status(200).json({
        id:_id,
        name:name,
        email:email
    })
})


