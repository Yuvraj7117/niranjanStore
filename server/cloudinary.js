import cloudinaryModule from "cloudinary";
import dotenv from "dotenv";


dotenv.config();

const cloudinary = cloudinaryModule.v2;

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

// const opts = {
//     overwrite:true,
//     invalidate:true,
//     resource_type:"auto"
// }

// module.exports = (image)=>{
//     return Promise((resolve,reject)=>{
//         cloudinary.uploader.upload(image,opts,(error,result)=>{
//             if(result && result.secure_url){
//                 return resolve(result.secure_url)
//             }
//             return reject ({message:error.message})
//         })
//     }) 
// }

export default cloudinary;