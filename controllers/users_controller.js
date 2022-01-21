const User=require('../models/user');
const fs=require('fs');
const path=require('path');
module.exports.profile=function(req,res){
    User.findById(req.params.id,function(err,user){
        if(err){
            console.log(err);
            return;
        }
        return res.render('users',{
            profile_user:user
        });
    });
    
}

module.exports.update= async function(req,res){
    // if(req.user.id==req.params.id){
    //     User.findByIdAndUpdate(req.params.id,{
    //         name:req.body.name,
    //         email:req.body.email
    //     },function(err,user){
    //         if(err){
    //             console.log(err);
    //             return;
    //         }

    //         return res.redirect('back');
    //     });
    // }
    // else{
    //      res.status(401).send('Unauthorized');
    // }


    if(req.user.id==req.params.id){
        try{
            let user= await User.findById(req.params.id);
            User.uploadAvatar(req,res,function(err){
                if(err){console.log(err)}
                console.log(req.file);
                user.name=req.body.name;
                user.email=req.body.email;

                if(req.file){
                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    }
                    user.avatar=User.avatarPath+'/'+ req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });
        }catch(err){
            console.log(err);
            return res.redirect('back');
        }
    }
    else{
         res.status(401).send('Unauthorized');
    }
}

module.exports.signIn=function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title:"Codieal | Sign In"
    });
}

module.exports.signUp=function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title:"Codeial | Sign Up"
    });
}

module.exports.create=function(req,res){
    
   
    if(req.body.password!=req.body.confirmPassword){
        return res.redirect('back');
    }

    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log(err);
            return;
        }

        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log(err);
                    return;
                }

                return res.redirect('/users/sign-in');
            })
        }

    });

}

module.exports.createSession=function(req,res){
    req.flash('success','Logged In successfully');
    return res.redirect('/');

}

module.exports.destroySession=function(req,res){
    req.flash('success','Logged out successfully');
    req.logout();
    res.redirect('/');
}