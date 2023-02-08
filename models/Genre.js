import mongoose from "mongoose";


const genres = new mongoose.Schema({

    name:{type:String,required:true},
    description:{type:String,required:true},

},{timestamps:true})


export const Gender =mongoose.model('genres',genres ) ;

