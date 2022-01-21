const Post=require('../models/post');
const User=require('../models/user');
module.exports.home= async function(req,res){

    // Post.find({},function(err,posts){
    //     if(err){console.log(err); return;}

    //     return res.render('home',{
    //         title:"Codial | Home",
    //         posts:posts
    //     });
    // });

    // Post.find({}).populate('user').exec(function(err,posts){
    //     if(err){
    //         console.log(err);
    //         return;
    //     }
    //     return res.render('home',{
    //         title:"Codial | Home",
    //         posts:posts
    //     });
    // });

 try{
    let posts= await  Post.find({}).populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    });

   

    let users= await User.find({});

                  return res.render('home',{
                        title:'Codeial | Home',
                        posts:posts,
                        all_users:users
                    });

        

        
 }

 catch(err){
     console.log(err);
     return back('/');
 }

    
   
    
}