const express = require('express');
const path = require('path');
const axios = require('axios');
require('dotenv').config();



app.get('/about' ,  (req , res)=>{


  console.log("ok test");


  res.render('about' , {
  
})
  })