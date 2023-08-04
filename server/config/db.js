const mongoose = require('mongoose')


const connectDB = async function(){
    try{
        const connect = await mongoose.connect(process.env.MONGO_URI)

        console.log(`MongoDB Connected:${connect.connection.host}`.blue.underline)

    }catch(err){
        console.log(err)
        process.exit(1)
    }
}

module.exports = connectDB