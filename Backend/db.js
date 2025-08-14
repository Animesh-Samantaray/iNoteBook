const mongoose = require('mongoose')
const url = 'mongodb://127.0.0.1:27017/notebook';

const connectDB = async()=>{
       await mongoose.connect(url).then((res)=>console.log('connected to db')).catch((err)=>console.log(err));
        console.log("Host:", mongoose.connection.host);
        console.log("Port:", mongoose.connection.port);
        console.log("DB name:", mongoose.connection.name);
}

module.exports=  connectDB;