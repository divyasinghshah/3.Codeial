const User=require('../models/user');

module.exports.profile=function(req,res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id,function(err,user){
            if(err){
                console.log(err);
                return;
            }

            if(user){
                return res.render('user_profile',{
                    title:user.name,
                    user:user
                });
            }
            

            return res.redirect('/users/sign-in');
        });
    }
}

module.exports.signIn=function(req,res){
    return res.render('user_sign_in',{
        title:"Codieal | Sign In"
    });
}

module.exports.signUp=function(req,res){
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

    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log(err);
            return;
        }
        if(user){
            if(user.password!=req.body.password){
                
                return res.render('back');
            }

            res.cookie('user_id',user.id);
            return res.redirect('/users/profile');


        }else{
           
            return res.redirect('back');
        }
        
    });

}