const express=require('express');
const port=8000;

const app=express();

app.listen(port,function(err){
    if(err){
        console.log("Error in starting server",err);
        return;
    }
    console.log("Server is up and running on port",port);
});