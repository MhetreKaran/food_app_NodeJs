const mongoose = require('mongoose');

//function mongodb database connection
 const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URL_LOCAL);
        console.log(`DB Connect ${mongoose.connection.host}`);
    } catch (error) {
        console.log('DB error',error)
    }
}

module.exports = connectDB;