const express=require('express');
const port=8000;
const cookie_parser=require('cookie-parser');
const app=express();
const expressLayouts=require('express-ejs-layouts');
const { ppid } = require('process');
const db=require('./config/mongoose');
const User=require('./models/user');
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const passportJWT=require('./config/passport-jwt-stratetegy');
const { Session } = require('express-session');
// const MongoStore=require('connect-mongo');
const sassMiddleware=require('node-sass-middleware');
const flash=require('connect-flash');
const customMidware=require('./config/middleware');
const passportGoogle=require('./config/passport-google-oauth2-strategy');

app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:'true',
    outputStyle:'extended',
    prefix:'/css'
}));

app.use(express.static('./assets'));
app.use('/uploads',express.static(__dirname+'/uploads'));
app.use(expressLayouts);
app.use(express.urlencoded());
app.use(cookie_parser());
app.set('view engine','ejs');
app.set('views','./views');
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.use(session({
    name:'codeial',
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    }
    
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(customMidware.setFlash);

app.use(passport.setAuthenticatedUser);
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log("Error in starting server",err);
        return;
    }
    console.log("Server is up and running on port",port);
});