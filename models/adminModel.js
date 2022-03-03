const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const AdminSchema=Schema({
    adminname:{
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
    password:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        default:true
    }
});

const AdminModel=mongoose.model('admin',AdminSchema);
module.exports=AdminModel;