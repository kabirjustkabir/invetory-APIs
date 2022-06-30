const Category = require('./../models/categoryModel')
const catchAsync = require('./../utils/catchAsync')
const AppError = require('./../utils/appError')

// function used for making a directory for categories
function createCategories(categories,parentId = null){
    let categoryList = [];
    let category;
    if(parentId == null){
        category = categories.filter(cate=> cate.parentID == undefined)
    }else{
        category = categories.filter(cate=> cate.parentID == parentId)
    }
    if(category.length>0){
    for(let cate of category){
        categoryList.push({
            _id:cate._id,
            name:cate.name,
            children: createCategories(categories,cate._id)
        })
    }return categoryList;}else{
        return undefined
    }    
}

// Add New Category or Sub-Category
exports.addCategory = catchAsync(async(req,res,next)=>{
    let category = await Category.create(req.body);

    res.status(201).json({
        status:"success",
        data:{
            category
        }
    })
})

// Get All Categories
exports.getCategories =catchAsync(async(req,res,next)=>{
    const allCategories = await Category.find()
    // console.log(typeof(allCategories));
    const categoryList = createCategories(allCategories);
    res.status(200).json({
        length:categoryList.length,
        data:{
            categoryList
        }
    })
})

// Update a Category
exports.updateCategory = catchAsync(async(req,res,next)=>{
    //console.log(req.params.id)
    const UpdateCategory = await Category.findByIdAndUpdate({ _id: req.params.id } , req.body,{
        new : true,
        runValidators: true
    })
    res.status(200).json({
        status: "Success",
        data:{
            UpdateCategory
        }
    })
});