const mongoose = require('mongoose');

const connetToMongoDB = async (uri)=>{
    try{
        let db = await mongoose.connect(uri);
        console.log(`Server connect to database host : ${db.connection.host}`)
    }catch(error){
        console.log(error.message)
    }
}

module.exports = connetToMongoDB