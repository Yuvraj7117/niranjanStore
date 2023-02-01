import dotenv from 'dotenv';
import express from 'express';
import database from './database.js';
import Product from './models/productModel.js';
import User from "./models/userModel.js";
import cors from 'cors';
import bcrypt from "bcrypt"
import cloudinary from './cloudinary.js';
// import bodyParser from 'body-parser';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000

database();

// app.use(bodyParser(urlencoded({extended:true})))
app.use(cors())
app.use(express.urlencoded({ extended: true}));
app.use(express.json({limit:"25mb"}));

app.post("/api/product", async (req, res) => {

   const products = await new Product(req.body)
   products.save()
   res.status(200).json({ message: "Product Inserted Successfully" })

})


// getting all products
app.get("/api/products", async (req, res) => {
   try {
      const product = await Product.find({});
      res.status(201).json(product)
   }
   catch (error) {
      "An Error is Occcured while getting" + error
   }
})


// getting single product
app.get("/api/product/:id", async (req, res) => {
   try {
      const product = await Product.findById(req.params.id);
      console.log(req.params.id)
      res.status(201).json(product)
   }
   catch (error) {
      "An Error is Occcured while getting" + error
   }
})

// app.get("/api/register", async (req, res) => {
//    console.log(req.body)
// })



//registration
//cloudinary options
const opts = {
   folder:"niranjanEcommerceProfile",
   Unique_filename: true,
   overwrite:true,
   invalidate:true,
   resource_type:"auto"
}


app.post("/api/register", async (req, res) => {
  
   const { firstname, lastname, email, password,  image } = req.body
   
   const salt = await bcrypt.genSalt()
   const encryptedPassword = await bcrypt.hash(password, salt)

   const cloudImage = await cloudinary.uploader.upload(image,opts,(error, result)=>{
      if(result && result.secure_url){
         return result.secure_url
      }
   })

   try {
         const user = await User({
            firstname, lastname, email, password: encryptedPassword, image:cloudImage
            
         });
         await user.save()  
         res.status(200).json("Successfully Registered")
      }
   catch (err) {
   
      res.status(401).json({ error: "User Already Exist" })
   }
})


//login
app.post("/api/login", async(req,res)=>{
   try{
      const { email , password}=req.body

      const user = await User.findOne({email:email}) ;
    if(user){
      const isMatch = await bcrypt.compare(password,user.password);

      if(isMatch){
        
        res.status(200).send({user,message:"User Logged In"})
      }
      else{
         res.status(401).json("Wrong Password")
      }
    }else{
      res.status(401).json("User Not Found")
    }     
   }
   catch(err){
      console.log(err)
   }
})

app.listen(port, () => { console.log(`Server is Running on ${port}`) })