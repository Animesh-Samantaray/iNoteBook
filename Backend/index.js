const connectDB = require('./db.js');
const express = require('express');
const port = 3000;
const app=express();
app.use(express.json());
connectDB();
app.listen(port , ()=>{
    console.log(`listing to http://localhost:${port}`);
})
app.use('/api/auth' , require('./routes/auth'))
app.use('/api/notes' , require('./routes/notes'))


app.get('/',(req,res)=>{
    res.send('root page');
});


