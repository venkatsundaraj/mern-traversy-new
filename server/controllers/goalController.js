const asyncHandler = require('express-async-handler')
const Goals = require('../models/goalModel')


exports.getGoals = asyncHandler(async function(req,res,next){
    
    const goals = await Goals.find({userId:req.user._id})
    return res.status(200).json(goals)
})



exports.setGoals = asyncHandler(async  function(req,res,next){

   

    if(!req.body.goal){
        res.status(404)
        throw new Error('need name field')
    }

    const goal = await Goals.create({
        goal:req.body.goal,
        userId:req.user._id
    })

    // console.log(goal)

    return res.status(200).json(goal)
})




exports.updateGoals = asyncHandler(async  function(req,res,next){
    console.log(req.body, req.params.userId)

    if(!req.body.goal){
        return res.status(400)
    }
    
    const updatedGoal = await Goals.findOne({_id:req.params.id, userId:req.user._id})

    if(!updatedGoal){
        res.status(401)
        throw new Error('invalid user')
    }
   
    updatedGoal.goal = req.body.goal
    
    await updatedGoal.save()

    

    return res.status(200).json(updatedGoal)
})





exports.deleteGoals = asyncHandler(async function(req,res,next){
    const deleteId = req.params.id
    console.log(deleteId)

    const deletedGoal = await Goals.findOneAndDelete({_id:deleteId, userId:req.user._id})

    
    
    if(!deletedGoal){
        res.status(401)
        throw new Error('invalid user')
    }

   


    return res.status(200).json({status:'goal deleted', id:deletedGoal._id})
} )