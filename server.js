const express=require('express');
const ejs=require('ejs');
const path=require('path');
const mongoose=require('mongoose');
const session=require('express-session');
const bcrypt=require('bcryptjs');
const cookie=require('cookie-parser');
const jwt=require('jsonwebtoken');
const flash=require('connect-flash');
const app=express();
//lodash full build.
var _=require('lodash');
//lodash core build
var _=require('lodash/core');

//set cookie.
app.use(session({
    cookie:{
        maxAge:6000000
    },
    secret:'shayantan123',
    resave:false,
    saveUninitialized:false
}))
app.use(cookie());

//use flash.
app.use(flash());

//urlencoded(buffer data)
app.use(express.urlencoded({
    extended:true
}));

//set user auth.
const userAuth=require('./middlewares/userAuth');
app.use(userAuth.authJwt);

//set admin auth.
const adminAuth=require('./middlewares/adminAuth');
app.use(adminAuth.authJwt);

//set vendor auth.
const vendorAuth=require('./middlewares/vendorAuth');
app.use(vendorAuth.authJwt);

//set view engine.
app.set('view engine','ejs');
app.set('views','views');

//set a static folder.
app.use(express.static(path.join(__dirname,'public')));

//set user router connection.
const userRoute=require('./routes/userRoute');
app.use(userRoute);

//set admin router connection.
const adminRoute=require('./routes/adminRoute');
app.use('/admin',adminRoute);

//set vendor router connection.
const vendorRoute=require('./routes/vendorRoute');
app.use('/vendor',vendorRoute);

//lodash path.
app.locals._=_;


//connect mongodb.
const dbDriver="#"

//connect ports.
const port=process.env.PORT || 50000
mongoose.connect(dbDriver,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(result=>{
    app.listen(port,()=>{
        console.log(`Connection Successfull`);
        console.log(`Server running at http://localhost:${port}`);
    })
}).catch(error=>{
    console.log(error);
})