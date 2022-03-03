const express=require('express');
const path=require('path');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const vendorModel=require('../models/vendorModel');
const categoryModel=require('../models/categoryModel');
const subCategory=require('../models/subCategoryModel');
const productModel=require('../models/productModel');



//home page controller.
exports.dashboard=(req,res)=>{
    productModel.find().populate('subCategory').populate('category').exec((error,data)=>{
        if(!error){
            console.log(data);
            res.render('vendor/vendorDashboard',{
                title:'Dashboard | Page',
                data:req.vendor,
                displayData:data,
                message:req.flash('message')
            })
        }
    })
}

//signup page controller.
exports.signup=(req,res)=>{
    res.render('vendor/signup',{
        title:'Signup | Page',
        data:req.vendor,
        message:req.flash('message')
    })
}

//signup data controller.
exports.addSignup=(req,res)=>{
    vendorModel({
        vendorname:req.body.vendorname,
        email:req.body.email,
        phone:req.body.phone,
        address:req.body.address,
        password:bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    }).save().then(result=>{
        req.flash('message','You have registered successfully.');
        res.redirect('/vendor/signup');
        console.log('vendor added...');
    }).catch(err=>{
        console.log(err,'Vendor add failed.');
    })
}

//login page controller.
exports.login=(req,res)=>{
    res.render('vendor/login',{
        title:'Login | Page',
        data:req.vendor,
        message:req.flash('message')
    })
}

//login data controller.
exports.addLogin=(req,res,next)=>{
    vendorModel.findOne({
        email:req.body.email
    },(err,data)=>{
        if(data){
            if(data.status){
                const hashpwd=data.password;
                if(bcrypt.compareSync(req.body.password, hashpwd)){
                    const token=jwt.sign({
                        id:data._id,
                        vendorname:data.vendorname,
                        email:data.email,
                        phone:data.phone,
                        address:data.address
                    },'shayantan@afkhaf837652f',{expiresIn:'120m'})
                    res.cookie('vendorToken',token);
                    res.redirect('/vendor');
                }else{
                    req.flash('message', 'Invalid Password');
                    res.redirect('/vendor/login');
                }
            }else{
                req.flash('message','Something went wrong [Status flase].');
                res.redirect('/vendor/login');
            }
        }else{
            req.flash('message','Invalid email');
            res.redirect('/vendor/login')
        }
    })
}

//vendorAuth connection.
exports.vendorAuth=(req,res,next)=>{
    if(req.vendor){
        console.log(req.vendor);
        next();
    }else{
        console.log(req.vendor,'err');
        res.redirect('/vendor/login');
    }
}

//add category page controller.
exports.showAddCategory=(req,res)=>{
    res.render("vendor/add-category",{
        data:req.vendor,
        message:req.flash('message')
    })
}

//add category data controller.
exports.addCategory=(req,res)=>{
    categoryModel({
        category:req.body.category
    }).save().then(result=>{
        req.flash('message','Category added successfully!!!');
        res.redirect('/vendor/showAddCategory')
    }).catch(error=>{
        console.log('Something went wrong.');
    })
}

//add subCategory page controller.
exports.showAddSubCategory=(req,res)=>{
    categoryModel.find().then(data=>{
        console.log(data);
        res.render("vendor/add-sub-category",{
            data:req.vendor,
            categories:data,
            message:req.flash('message')
        })
    })
}

//add subCategory data controller.
exports.addSubCategory=(req,res)=>{
    subCategory({
        subCategory:req.body.subcategory,
        category:req.body.category
    }).save().then(result=>{
        req.flash('message','Sub-Category Added!!!')
        res.redirect('/vendor/showAddSubCategory');
    }).catch(error=>{
        console.log(error);
    })
}

//add product page controller.
exports.showAddProduct=(req,res)=>{
    categoryModel.find().then(result=>{
        subCategory.find().then(result1=>{
            res.render('vendor/add-product',{
                data:req.vendor,
                displayData:result,
                displayData1:result1,
                message:req.flash('message')
            })
        })
    })
}

//add product data controller.
exports.addProduct=(req,res)=>{
    productModel({
        category:req.body.category,
        subCategory:req.body.subcategory,
        product:req.body.productname,
        price:req.body.price,
        image:req.file.filename
    }).save().then(result=>{
        req.flash('message','Product Added!!!');
        res.redirect('/vendor/showAddProduct');
    }).catch(error=>{
        console.log(error);
    })
}

//logout controller.
exports.logout=(req,res)=>{
    res.clearCookie('vendorToken');
    res.redirect('/');
}