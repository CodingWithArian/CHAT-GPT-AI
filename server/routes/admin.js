const express=require('express');

const {registerUser}=require('../Controllers/registerUser');
const {loginUser}=require('../Controllers/loginUser');

const app=express();

app.use((req, res, next)=> {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

  const router=express.Router();

  router.post('/register',registerUser);
  router.post('/login',loginUser);
  

  module.exports=router;