const express=require('express');
const path=require('path');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const adminModel=require('../models/adminModel');
const categoryModel=require('../models/categoryModel');
const subCategory=require('../models/subCategoryModel');
const productModel=require('../models/productModel');


//home page controller.
exports.dashboard=(req,res)=>{
    productModel.find().populate('subCategory').populate('category').exec((error,data)=>{
        if(!error){
            console.log(data);
            res.render('admin/dashboard',{
                title:'Dashboard | Page',
                data:req.admin,
                displayData:data,
                message:req.flash('message')
            })
        }
    })
}

//signup page controller.
// exports.signup=(req,res)=>{
//     res.render('admin/signup',{
//         title:'Signup | Page',
//         data:req.admin,
//         message:req.flash('message')
//     })
// }

//signup data controller.
// exports.addSignup=(req,res)=>{
//     adminModel({
//         adminname:req.body.adminname,
//         email:req.body.email,
//         phone:req.body.phone,
//         password:bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
//     }).save().then(result=>{
//         req.flash('message','You have registered successfully.');
//         res.redirect('/admin/signup');
//         console.log('admin added...');
//     }).catch(err=>{
//         console.log(err,'Admin add failed.');
//     })
// }

//login page controller.
exports.login=(req,res)=>{
    res.render('admin/login',{
        title:'Login | Page',
        data:req.admin,
        message:req.flash('message')
    })
}

//login data controller.
exports.addLogin=(req,res,next)=>{
    adminModel.findOne({
        email:req.body.email
    },(err,data)=>{
        if(data){
            if(data.status){
                const hashpwd=data.password;
                if(bcrypt.compareSync(req.body.password, hashpwd)){
                    const token=jwt.sign({
                        id:data._id,
                        adminname:data.adminname,
                        email:data.email,
                        phone:data.phone,
                    },'mitra@837463gkjfajh',{expiresIn:'20m'})
                    res.cookie('adminToken',token);
                    res.redirect('/admin/');
                }else{
                    req.flash('message', 'Invalid Password');
                    res.redirect('/admin/login');
                }
            }else{
                req.flash('message','Something went wrong [Status flase].');
                res.redirect('/admin/login');
            }
        }else{
            req.flash('message','Invalid email');
            res.redirect('/admin/login')
        }
    })
}

//userAuth connection.
exports.adminAuth=(req,res,next)=>{
    if(req.admin){
        console.log(req.admin);
        next();
    }else{
        console.log(req.admin,'err');
        res.redirect('/admin/login');
    }
}

//delete the data
exports.delete=(req,res)=>{
    const productid=req.params.u_id
    productModel.deleteOne({_id:productid}).then(deletedata=>{
        console.log(deletedata,"delete successful");
        res.redirect('/admin/');
    }).catch(err=>{
        console.log((err,"delete failed"));
    })
}

//logout controller.
exports.logout=(req,res)=>{
    res.clearCookie('adminToken');
    res.redirect('/');
}