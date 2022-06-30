const mongoose = require('mongoose');

const invoiceDetailSchema = mongoose.Schema({
    invoiceNo:{
        type:String,
        required:true
    },
    p_name:{
        type:String,
        required:true
    },
    p_qty:{
        type:Number,
        required:true
    },
    p_price:{
        type:Number,
        required:true
    }
},{
    timestamps:true
})

const invoiceDetail = mongoose.model('invoiceDetail',invoiceDetailSchema)

module.exports = invoiceDetail