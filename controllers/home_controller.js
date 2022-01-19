const Post=require('../models/post');
module.exports.home=function(req,res){

    // Post.find({},function(err,posts){
    //     if(err){console.log(err); return;}

    //     return res.render('home',{
    //         title:"Codial | Home",
    //         posts:posts
    //     });
    // });

    Post.find({}).populate('user').exec(function(err,posts){
        if(err){
            console.log(err);
            return;
        }
        return res.render('home',{
            title:"Codial | Home",
            posts:posts
        });
    })
    
   
    
}