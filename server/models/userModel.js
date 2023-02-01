import mongoose from "mongoose";
import validator from "validator";


const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
           if(! validator.isEmail(value)){
            throw new Error ("Email is inValid")
           }
        }
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
    },
    image:{
        type:Object
    }
})
const User = new mongoose.model("user",userSchema);

export default User;