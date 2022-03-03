const express=require('express');
const Route=express.Router();
const userController=require('../controllers/userController');
const verify=require('../middlewares/verifyUserSignup')

Route.get('/',userController.home);
Route.get('/login',userController.login);
Route.post('/addLogin',userController.addLogin);
Route.get('/signup',userController.signup);
Route.post('/addSignup',[verify.verifySignup],userController.addSignup);
Route.get('/profile',userController.userAuth,userController.profile);
Route.get('/products',userController.products);
Route.post('/fetch-product',userController.fetchProduct);
Route.get('/logout',userController.logout);







module.exports=Route;