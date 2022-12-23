const mongoose = require('mongoose')
const autoIncrement = require('mongoose-sequence')(mongoose)
const ObjectId = mongoose.Schema.Types.ObjectId

const cardSchema = new mongoose.Schema({
  _id:Number,
  cardNumber: {
    type: String,
    required: true,
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
cardSchema.plugin(autoIncrement)

module.exports = mongoose.model('card',cardSchema)