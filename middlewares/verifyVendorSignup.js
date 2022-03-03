const vendorModel=require('../models/vendorModel');

exports.verifySignup=(req,res,next)=>{
    vendorModel.findOne({
        vendorname:req.body.vendorname
    }).exec((err,vendor)=>{
        if(err){
            console.log(err);
            return;
        }
        if(vendor){
            req.flash('message','Vendorname already exists.');
            return res.redirect('/vendor/signup');
        }
        vendorModel.findOne({
            email:req.body.email
        }).exec((err,email)=>{
            if(err){
                console.log(err);
                return;
            }
            if(email){
                req.flash('message','Email already exists.');
                return res.redirect('/vendor/signup');
            }
            const password=req.body.password;
            const confirm=req.body.confirmPassword;
            if(password !== confirm){
                req.flash('message','Password mismatch');
                return res.redirect('/vendor/signup');
            }
            next();
        })
    })
}