const mongoose = require('mongoose');

const invoiceSchmea = mongoose.Schema({
    invoiceNo:{
        type:String,
        required:true
    },
    custName:{
        type:String,
        required:true
    },
    orderDate:{
        type:Date,
        required:true
    },
    subtotal:{
        type:Number,
        required:true
    },
    gst:{
        type:Number,
        required:true
    },
    netTotal:{
        type:Number,
        required:true
    },
    paidAmt:{
        type:Number,
        required:true
    },
    due:{
        type:Number,
        required:true
    }
},{
    timestamps:true
})

const Invoice = mongoose.model('Invoice',invoiceSchmea)

module.exports = Invoice