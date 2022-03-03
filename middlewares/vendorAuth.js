const jwt=require('jsonwebtoken');

exports.authJwt=(req,res,next)=>{
    if(req.cookies && req.cookies.vendorToken){
        jwt.verify(req.cookies.vendorToken,'shayantan@afkhaf837652f',(err,data)=>{
            req.vendor=data
            next();
        })
    }else{
        next();
    }
}