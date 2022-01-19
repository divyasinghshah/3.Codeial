const Comments=require('../models/comments');
const Post=require('../models/post');


module.exports.create=function(req,res){
    Post.findById(req.body.post,function(err,post){
        if(err){
            console.log(err);
            return;
        }

        if(post){
            Comments.create({
                content:req.body.content,
                post:post._id,
                user:req.user.id
            },function(err,comment){
                if(err){
                    console.log(err);
                    return;
                }
                post.comments.push(comment);
                post.save();
                res.redirect('/');
            });
        }
    });
}