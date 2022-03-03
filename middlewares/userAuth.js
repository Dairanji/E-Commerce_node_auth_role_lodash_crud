const jwt=require('jsonwebtoken');

exports.authJwt=(req,res,next)=>{
    if(req.cookies && req.cookies.userToken){
        jwt.verify(req.cookies.userToken,'mitra@afkhaf837652f',(err,data)=>{
            req.user=data
            next();
        })
    }else{
        next();
    }
}