const mongoose = require('mongoose')
const url = 'mongodb://127.0.0.1:27017/notebook';

const connectDB = ()=>{
        mongoose.connect(url).then((res)=>console.log('connected to db')).catch((err)=>console.log(err));
}

module.exports=  connectDB;