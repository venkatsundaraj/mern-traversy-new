const mongoose = require('mongoose')

const GoalSchema = mongoose.Schema({
    goal:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    }
})

module.exports = mongoose.model('Goals', GoalSchema)