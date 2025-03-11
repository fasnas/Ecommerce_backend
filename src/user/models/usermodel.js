import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isBlocked:{
        type:Boolean,
        required:false
    },
    role:{
        type:String,
        default:user
    }
},
    {timestamps:true}
)

const usermodel=mongoose.model("users",userSchema)
export default usermodel