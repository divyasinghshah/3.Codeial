const Post=require('../../../models/post');
const Comment=require('../../../models/comments');

module.exports.index= async function(req,res){

    try{
        let posts= await  Post.find({}).populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    });


    return res.json(200,{
        message:"List Of post",
        post:posts
    });
    }catch(err){
        return res.json({
            message:"Error"
        });
    }
}

module.exports.destroy= async function(req,res){
   try{
    let post= await Post.findById(req.params.id);
     
     
    post.remove();
    await Comment.deleteMany({post:req.params.id});
       
    return res.json(200,{
        message:"Deleted Successfully"
    });
   

   }catch(err){
       console.log(err);
       return res.json(500,{
           message:"internal server error"
       });
   }
        
         
         
   
 }