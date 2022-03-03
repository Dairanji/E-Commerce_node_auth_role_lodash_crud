const express=require('express');
const Route=express.Router();
const adminController=require('../controllers/adminController');
const { addLogin } = require('../controllers/userController');

Route.get('/',adminController.adminAuth,adminController.dashboard);
// Route.get('/signup',adminController.signup);
// Route.post('/addSignup',adminController.addSignup);
Route.get('/login',adminController.login);
Route.post('/addLogin',adminController.addLogin);
Route.get('/delete/:u_id',adminController.delete);
Route.get('/logout',adminController.logout);


module.exports=Route;