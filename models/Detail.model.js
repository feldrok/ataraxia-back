import mongoose from "mongoose";

const detailSchema=new mongoose.Schema({
    ibu:{type:Number ,},
    alcohol:{type:Number },
    container:{type:String },
    ml:{type:Number },
    packSize:{type:Number },
    color:{type:String },
    size:{type:Number },
    category_id:{type:mongoose.Schema.Types.ObjectId,ref:'categories',required:true},
})

export const Detail=mongoose.model('details',detailSchema)