module.exports.home=function(req,res){

    
    res.cookie('user_id',23);
    return res.render('home',{
        name:"Divya"
    });
}