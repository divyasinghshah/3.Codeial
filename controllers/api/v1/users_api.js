const jwt=require('jsonwebtoken');
const User=require('../../../models/user');

module.exports.createSession= async function(req,res){
    try{
        let user= User.findOne({email:req.body.email});
        if(!user || user.password!=req.body.password){
            return res.json(422,{
                message:"Invalid Username or Password"
            });

        }

        return res.json(200,{
            message:"Signed In Successfully",
            data:{
                token: jwt.sign(toJSON(user),'codeial',{expiresIn:'100000' })
            }
        });
    }catch(err){

        console.log(err);
        return res.json(500,{
            message:'Internal Server error'
        });

    }
}