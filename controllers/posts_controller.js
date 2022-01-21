const Post=require('../models/post');
const Comment=require('../models/comments');
module.exports.create= async function(req,res){
   try{
    let post=  await Post.create({
        content:req.body.content,
        user:req.user._id
    });
    
    if(req.xhr){
        return res.status(200).json({
            data: {
                post:post
            },
            message:'Post Created'
        });
    }
    
     return res.redirect('back');
   }
   catch{
       console.log(err);
       res.redirect('back');
   }



}

module.exports.destroy= async function(req,res){
   let post= await Post.findById(req.params.id);
    
    
        if(post.user==req.user.id){
            post.remove();
            Comment.deleteMany({post:req.params.id},function(err,comment){
                if(err){
                    console.log(err);
                    return;
                }
                return res.redirect('/');
            });

       
        }
        if(req.xhr){
            return res.status(200).json({
                data:{
                    post_id:req.params.id
                },
                message:"Post Deleted"
            });
        }
  
}