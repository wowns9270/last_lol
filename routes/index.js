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
<<<<<<< HEAD
        const info = await axios.get(`https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${newId.data.id}?api_key=${process.env.api_key}`);
        
=======
    
        const info = await axios.get(`https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${newId.data.id}?api_key=${process.env.api_key}`);

>>>>>>> test
        let currentgame = {
            color :"green" ,
            text : "In Game"
        };
        
        const current = await axios.get(`https://kr.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${newId.data.id}?api_key=${process.env.api_key}`)
<<<<<<< HEAD
=======

>>>>>>> test
        .catch( res =>{
            if (res.response.status === 404){
                return currentgame = {
                    color :"red" ,
                    text : "Not In Game"
                };
            }
        }) 
<<<<<<< HEAD
=======

>>>>>>> test
        
        if(info.data[0] === undefined){
            res.render('not_user');
        }
        else{
            
            let a = [];

            info.data.map( item =>{

                if(item.queueType === 'RANKED_SOLO_5x5'){
                    a = item;
                }
            })
            
             res.render('user' , {
                 user : a,
                style : 'user',
                all : a.wins + a.losses,
                current : currentgame,
            })
        }   
    }catch(e){
        console.log(e);
        res.render('error');
    }
    
});



module.exports = router;