import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    name:{type:String,required:tue},
    price:{type:Number,required:true},
    stock:{type:Number,required:true},
    productDetails_id:{type:mongoose.Schema.Types.ObjectId,ref:'details', required:true}
})

export const Product=mongoose.model('products',productSchema)