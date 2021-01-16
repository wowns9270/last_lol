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
}
else{
    app.use(morgan('dev'));
}


app.engine(
    "hbs",
    hbs({
      extname: "hbs",
      defaultLayout: "layout", // 기본레이아웃 설정
      // 레이아웃 디렉토리 설정.. 리액트에서 레이아웃 따로 정하면 필요없단다?...
      layoutsDir: __dirname + "/views/layouts",
      // 반복적인 html코드가 있다면 아래 지정경로에서 가져다 쓸수 있다.
      partialsDir: __dirname + "/view/partials"
    })
  );
  app.set('view engine','hbs') //

const mainRouter = require('./routes/index');

app.use('/' , mainRouter);


app.listen( app.get('port') , ()=>{
    console.log(`성공 ${app.get('port')}`);
} )
