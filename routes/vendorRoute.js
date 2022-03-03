const express=require('express');
const Route=express.Router();
const multer=require('multer');
const path=require('path');
const vendorController=require('../controllers/vendorController');
const verify=require('../middlewares/verifyVendorSignup');

//setup file storage.
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, "./public/uploads/")
    },
    filename:(req,file,cb)=>{
        cb(null, file.fieldname + '-' + Date.now() + 'product' + path.extname(file.originalname));
    }
})

//define 1mb filesize.
const maxSize=1*1024*1024;

const upload=multer({
    storage:storage,
    fileFilter:(req,file,cb)=>{
        if(file.mimetype=="image/png" || file.mimetype=="image/jpg" || file.mimetype=="image/jpeg"){
            cb(null,true);
        }else{
            cb(null,false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed.'))
        }
    },
    limits:{
        fileSize: maxSize
    }
})

Route.get('/',vendorController.vendorAuth,vendorController.dashboard);
Route.get('/signup',vendorController.signup);
Route.post('/addSignup',[verify.verifySignup],vendorController.addSignup);
Route.get('/login',vendorController.login);
Route.post('/addLogin',vendorController.addLogin);
Route.get('/logout',vendorController.logout);

Route.get('/showAddCategory',vendorController.vendorAuth,vendorController.showAddCategory);
Route.post('/addCategory',vendorController.addCategory);
Route.get('/showAddSubCategory',vendorController.vendorAuth,vendorController.showAddSubCategory);
Route.post('/addSubCategory',vendorController.addSubCategory);
Route.get('/showAddProduct',vendorController.vendorAuth,vendorController.showAddProduct)
Route.post('/addProduct',upload.single('productimage'),vendorController.addProduct);


module.exports=Route;