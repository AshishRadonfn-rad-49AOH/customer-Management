const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const cardSchema = new mongoose.Schema({
  cardNumber: {
    type:String,
    required: true,
    autoIncrement: true,
    trim: true
  },
  
  cardType: {
    type:String,
    required: true,
    trim: true
  },
  customerName: {
    type:String,
    required: true,
    trim: true
  },
  Status: {
    type:String,
    default: 'Active',
    trim: true
  },
  vision: {
    type:String,
    trim: true
  },
  customerId:{
    type: ObjectId,
    ref: 'customer',
    required:true
  }
}, {timestamps:true})

module.exports = mongoose.model('card',cardSchema)