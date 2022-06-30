const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    qty:{
        type:Number,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    productPictures:[
        {img:{type:String}}
    ],
    category:{
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required:true
    },
    createdBy:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required:true
    }
},{
    timestamps:true
})

const Product = mongoose.model('Product',productSchema)

module.exports =Product;