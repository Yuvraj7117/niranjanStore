import dotenv from 'dotenv';
import express from 'express';
import database from './database.js';
import Product from './model.js';
import cors from 'cors';
// import bodyParser from 'body-parser';

dotenv.config();

const app = express();
const port= process.env.PORT || 5000

database();

// app.use(bodyParser(urlencoded({extended:true})))
app.use(cors())
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.post("/api/product",async(req,res)=>{

    const products = await new Product(req.body) 
   products.save()
   res.status(200).json({message:"Product Inserted Successfully"})

})


// getting all products
app.get("/api/products",async(req,res)=>{
 try{
    const product = await Product.find({});
    res.status(201).json(product)
 }
 catch(error){
    "An Error is Occcured while getting"  + error
 }
})


// getting single product
app.get("/api/product/:id",async(req,res)=>{
   try{
      const product = await Product.findById(req.params.id);
      console.log(req.params.id)
      res.status(201).json(product)
   }
   catch(error){
      "An Error is Occcured while getting"  + error
   }
  })


app.listen(port,()=>{console.log(`Server is Running on ${port}`)})