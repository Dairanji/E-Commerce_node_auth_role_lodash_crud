const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const VendorSchema=Schema({
    vendorname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        default:true
    }
});

const VendorModel=mongoose.model('vendor',VendorSchema);
module.exports=VendorModel;