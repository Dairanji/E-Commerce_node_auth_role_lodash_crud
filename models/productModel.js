const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const ProductSchema=Schema({
    category:{
        type:Schema.Types.ObjectId,
        ref:'category'
    },
    subCategory:{
        type:Schema.Types.ObjectId,
        ref:'subCategory'
    },
    product:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    }
})

const ProductModel=mongoose.model('product', ProductSchema);
module.exports=ProductModel;