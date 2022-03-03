const express=require('express');
const path=require('path');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const lodash=require('lodash');
const userModel=require('../models/userModel');
const productModel=require('../models/productModel');
const subCategoryModel=require('../models/subCategoryModel');
const categoryModel=require('../models/categoryModel');

//lodash full build.
var _=require('lodash');
//lodash core build
var _=require('lodash/core');


//home page controller.
exports.home=(req,res)=>{
    res.render('home',{
        title:'Home | Page',
        data:req.user,
        message:req.flash('message')
    })
}

//signup page controller.
exports.signup=(req,res)=>{
    res.render('signup',{
        title:'Signup | Page',
        data:req.user,
        message:req.flash('message')
    })
}

//signup data controller.
exports.addSignup=(req,res)=>{
    userModel({
        username:req.body.username,
        email:req.body.email,
        phone:req.body.phone,
        address:req.body.address,
        password:bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    }).save().then(result=>{
        req.flash('message','You have registered successfully.');
        res.redirect('/signup');
        console.log('user added...');
    }).catch(err=>{
        console.log(err,'User add failed.');
    })
}

//login page controller.
exports.login=(req,res)=>{
    res.render('login',{
        title:'Login | Page',
        data:req.user,
        message:req.flash('message')
    })
}

//login data controller.
exports.addLogin=(req,res,next)=>{
    userModel.findOne({
        email:req.body.email
    },(err,data)=>{
        if(data){
            if(data.status){
                const hashpwd=data.password;
                if(bcrypt.compareSync(req.body.password, hashpwd)){
                    const token=jwt.sign({
                        id:data._id,
                        username:data.username,
                        email:data.email,
                        phone:data.phone,
                        address:data.address
                    },'mitra@afkhaf837652f',{expiresIn:'20m'})
                    res.cookie('userToken',token);
                    res.redirect('/');
                }else{
                    req.flash('message', 'Invalid Password');
                    res.redirect('/login');
                }
            }else{
                req.flash('message','Something went wrong [Status flase].');
                res.redirect('/login');
            }
        }else{
            req.flash('message','Invalid email');
            res.redirect('/login')
        }
    })
}

//userAuth connection.
exports.userAuth=(req,res,next)=>{
    if(req.user){
        console.log(req.user);
        next();
    }else{
        console.log(req.user,'err');
        res.redirect('/login');
    }
}

//profile page controller.
exports.profile=(req,res)=>{
    res.render('profile',{
        title:'Profile | Page',
        data:req.user,
        message:req.flash('message')
    })
}

//products page controller.
exports.products=(req,res)=>{
    subCategoryModel.find().populate('category').exec((error,data)=>{
        console.log(data);
        lodashData=lodash.groupBy(data,'category.category');
        console.log(lodashData);
        for(element in lodashData){
            console.log(element);
        }
        _.forEach(lodashData,function(element,i) {
            console.log(element);  
            for(let i=0; i<element.length; i++){
                console.log(element[i].subCategory);
            }         
        })
        if(!error){
            productModel.find().then(products=>{
                res.render('products',{
                    data:req.user,
                    displayData:lodashData,
                    allProducts:products,
                });
            }).catch(err=>{
                console.log('Error while fetch product.');
            })
        }else{
            console.log('Something went wrong.');
        }
    })
}

exports.fetchProduct=(req,res)=>{
    productModel.find({subCategory:req.body.subCatID}).then(data=>{
        res.send(data)
    }).catch(error=>{
        console.log('error');
    })
}

//logout controller.
exports.logout=(req,res)=>{
    res.clearCookie('userToken');
    res.redirect('/');
}