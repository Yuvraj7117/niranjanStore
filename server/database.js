import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


const URI = process.env.URI

const database =()=>{mongoose.connect(URI,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{console.log("Database is Connected")
 }) .catch((e)=>{
    console.log(`While ${e} in Connecting to Databse`)
})}

export default database;