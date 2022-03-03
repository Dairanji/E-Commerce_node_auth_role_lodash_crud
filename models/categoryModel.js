const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const CategorySchema=Schema({
    category:{
        type:String,
        required:true
    }
})

const CategoryModel=mongoose.model('category', CategorySchema)
module.exports=CategoryModel;