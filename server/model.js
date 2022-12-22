import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name:{
        type:String  
    },
    company:{
        type:String
    },
    price:{
        type:Number
    },
    colors:{
        type:Array
    },
    image:{
        type:String
    },
    description:{
        type:String
    },
    category:{
        type:String
    },
    featured:{
        type:Boolean
    },
    shipping:{
        type:Boolean
    },
    stock:{
        type:Number
    },
    reviews:{
        type:Number
    },
    stars:{
        type:Number
    }


})

const Product = new mongoose.model('product',productSchema);

export default Product;