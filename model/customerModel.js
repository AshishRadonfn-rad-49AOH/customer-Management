const mongoose = require("mongoose")
const customerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    mobileNo: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    DOB: {
        type: Date,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    address:{
        type:String,
        required:true,
        trim:true
    },
    customerId:{
    type: String,
    required : true,
    trim : true
    },
    Status:{
        type:String,
        required:true,
        trim:true
    },
    deletedAt: {
        type: Date
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
},
    { timestamps: true }
)
module.exports = mongoose.model("customer", customerSchema)