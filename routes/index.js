const express = require('express');
const path = require('path');
const axios = require('axios');
require('dotenv').config();


const router = express.Router();


router.get('/' , (req,res) =>{
    res.render('home', {
        style : 'home',
    });
});


router.post('/' , async(req , res) =>{
    try{

        const newId = await axios.get(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURI(req.body.id)}?api_key=${process.env.api_key}`);
        
        //console.log(newId);
        
        const info = await axios.get(`https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${newId.data.id}?api_key=${process.env.api_key}`);

        //console.log(info.data[0]);

        if(info.data[0] === undefined){
            res.render('not_user');
        }
        else{
    //console.log(info.data);
             res.render('user' , {
                user : info.data[0],
                style : 'user',
                all : info.data[0].wins + info.data[0].losses,
            })
        }   
    
    }catch(e){
        res.render('error');
    }
});



module.exports = router;