const express=require('express');
const port=8000;

const app=express();
const expressLayouts=require('express-ejs-layouts');
const { ppid } = require('process');
const db=require('./config/mongoose');
app.use(express.static('./assets'));
app.use(expressLayouts);

app.set('view engine','ejs');
app.set('views','./views');
app.set('layout extractStyles',true);
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log("Error in starting server",err);
        return;
    }
    console.log("Server is up and running on port",port);
});