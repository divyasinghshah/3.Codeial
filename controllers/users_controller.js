const User=require('../models/user');

module.exports.profile=function(req,res){
    return res.render('users');
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

}