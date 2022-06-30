const Product = require('./../models/productModel');
const catchAsync = require('./../utils/catchAsync')

exports.addProduct = catchAsync(async(req,res,next)=>{
    //res.status(200).json({file:req.files,body:req.body})
    const {name,qty,price,category} = req.body
    let productPictures = [];
    if(req.files.length>0){
        productPictures = req.files.map(file =>{
            return {img:file.filename}
        })
    }
    const product = await Product.create({
        name,qty,price,productPictures,category,createdBy:req.user._id
    })

    res.status(201).json({
        message:"Success",
        product
    })
})
// get All Products
exports.getAllProducts = catchAsync(async(req,res,next)=>{
    const products = await Product.find()
    res.status(200).json({
        message:"Success",
        data:{
            products
        }
    })
})

