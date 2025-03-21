import mongoose  from "mongoose";

export const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    stock:{
        type:Number,
        required:true
    },
    category: {
        type: String,
        required: true
      },
    description:{
        type:String,
        required:true
    }
})

const productModel=mongoose.model("products",productSchema)
export default productModel;