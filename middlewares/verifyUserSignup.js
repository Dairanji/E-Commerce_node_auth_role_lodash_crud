const userModel=require('../models/userModel');

exports.verifySignup=(req,res,next)=>{
    userModel.findOne({
        username:req.body.username
    }).exec((err,user)=>{
        if(err){
            console.log(err);
            return;
        }
        if(user){
            req.flash('message','Username already exists.');
            return res.redirect('/signup');
        }
        userModel.findOne({
            email:req.body.email
        }).exec((err,email)=>{
            if(err){
                console.log(err);
                return;
            }
            if(email){
                req.flash('message','Email already exists.');
                return res.redirect('/signup');
            }
            const password=req.body.password;
            const confirm=req.body.confirmPassword;
            if(password !== confirm){
                req.flash('message','Password mismatch');
                return res.redirect('/signup');
            }
            next();
        })
    })
}