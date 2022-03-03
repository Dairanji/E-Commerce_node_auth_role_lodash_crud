const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const SubCategorySchema=Schema({
    subCategory:{
        type:String,
        required:true
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:'category'
    }
})

const SubCategoryModel=mongoose.model('subCategory', SubCategorySchema);
module.exports=SubCategoryModel;