const express=require('express');
const bodyParser=require('body-parser');
const dotEnv=require('dotenv');

const admin=require('./routes/admin');
const {errorHandler}=require('./middlewares/errorHandler');
const connectDB = require("./dataBase/mgDatabase");


const app=express();
dotEnv.config({path:"./config/config.env"});

connectDB()

app.use((req, res, next)=> {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.use('/api',admin);
app.use(errorHandler);

const PORT=process.env.PORT || 5000;

app.listen(PORT ,()=>{
    console.log(`Server is Running on ${process.env.NODE_ENV} mode on Port ${PORT}`);
});