const Comment=require('../models/comments');
const Post=require('../models/post');
const commentsMailer=require('../mailers/comments_mailer');

// module.exports.create=function(req,res){
//     Post.findById(req.body.post,function(err,post){
//         if(err){
//             console.log(err);
//             return;
//         }

//         if(post){
//             Comments.create({
//                 content:req.body.content,
//                 post:post._id,
//                 user:req.user.id
//             },function(err,comment){
//                 if(err){
//                     console.log(err);
//                     return;
//                 }
//                 post.comments.push(comment);
//                 post.save();
                
//                 res.redirect('/');
//             });
//         }
//     });
// }

// module.exports.create= async function(req,res){
//   try{
//     let post= await Post.findById(req.body.post);

//     if(post){
//         let comment= await Comments.create({
//             content:req.body.content,
//             post:post._id,
//             user:req.user.id
//         });

//         post.comments.push(comment);
//         post.save();
//         comment=await comment.populate('user','name').execPopulate();
//         commentMailer.newComment(comment);
//         return res.redirect('back');
//     }
//   }catch(err){
//         console.log(err);
//         return res.redirect('back');
//   }
  
// }

module.exports.create= async function(req,res){
    try{
        let post=await Post.findById(req.body.post);
  
        if(post){
            let comment= await Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            });
  
            post.comments.push(comment);
            post.save();
            comment=await comment.populate('user', 'name email').execPopulate();
           commentsMailer.newComment(comment);
        
  
         
            
            req.flash('success','Comment Published');
            return res.redirect('back');
        }
  
    }
    catch(err){
      req.flash('error',err);
    //   console.log(err);
      return res.redirect('back');
        
  
    }
  }
  

module.exports.destroy=function(req,res){
    Comments.findById(req.params.id,function(err,comment){
        if(err){
            console.log(err);
            return;
        }

        if(comment.user==req.user.id){
            let postId=comment.post;
            comment.remove();
            Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}}, function(err,post){
                if(err){
                    console.log(err);
                    return;
                }

                return res.redirect('back');
            });


        }else{
            res.redirect('back');
        }
    })
}