import mongoose from "mongoose";

const product = new mongoose.Schema({
    genre:{type:mongoose.Schema.Types.ObjectId,ref:'genres',required:true}, 
    name:{type:String,required:true},
    photo:{type:String,required:true},
    price: {type:Number,required:true},
    stock: {type:Number,required:true},
    demo: {type:String},
    description:{type:String,required:true},
    artist : {type:String,required:true},
    date : {type:Date},
    sales : {type:Number,required:true},
},{timestamps:true})

export const Product = mongoose.model('products',product ) ;