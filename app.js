const express = require('express');
const path = require('path');
const morgan = require('morgan');
const hbs = require('express-handlebars');
const handlebars = require("handlebars");
const axios = require('axios');

const helmet = require('helmet');
const hpp = require('hpp');


let indexRouter = require('./routes/index');
let app = express(); // 연결?

app.set( 'port' , process.env.PORT || 3000);

//app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended : true}));


if(process.env.NODE_ENV === 'production'){
    app.enable('trust proxy');
    app.use(morgan('combined'));
    app.use(helmet({contentSecurityPolicy : false}));
    app.use(hpp());
    console.log("gigi")
}
else{
    app.use(morgan('dev'));
}


app.engine(
  "hbs",
  hbs({
    extname: "hbs",
  })
);
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));

const mainRouter = require('./routes/index');

app.use('/' , mainRouter);

//const aboutRouter = require('./routes/about');

app.get('/about' ,  (req , res)=>{

     res.render('about' , {

     })
   })

//app.use('/about' , aboutRouter);



app.listen( app.get('port') , ()=>{
    console.log(`성공 ${app.get('port')}`);
} )

//cross-env NODE_ENV=production PORT=80 pm2 start app.js