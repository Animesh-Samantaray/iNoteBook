const connectDB = require('./db.js');
const express = require('express');
const port = 3000;
const app=express();

app.listen(port , ()=>{
    console.log(`listing to http://localhost:${port}`);
})

connectDB();

app.get('/',(req,res)=>{
    res.send('root page');
});


