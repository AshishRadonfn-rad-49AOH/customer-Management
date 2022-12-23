const cardModel = require('../model/cardModel')
const customerModel = require('../model/customerModel')


const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
};



const createCard = async (req, res) => {
    try {
        let data = req.body;
    let {cardNumber, cardType, customerName, vision, customerId} = data

    if(!Object.keys(data).length) return res.status(400).send({status: false, message: 'no data found'})

    if(!cardNumber) return res.status(400).send({status: false, message: 'Please enter the card number'})
    if(!cardType) return res.status(400).send({status: false, message: 'Please enter the card number'})
    if(!['Regular', 'Special'].includes(cardType)) return res.status(400).send({status:false, message:'Enter valid card Type'})
    if(!customerName) return res.status(400).send({status: false, message: 'Please enter the card number'})
    if(!(/^[A-Za-z]+$/i.test(customerName))) return  res.status(400).send({status:false, message: 'Enter the valid customer name'})

    if(!vision) return res.status(400).send({status: false, message: 'Please enter the vision'})
    
    if(!isValid(customerId)) return res.status(400).send({status:false, message:'customer id is required'})
    if(!customerId) return res.status(400).send({status: false, message: 'customer must be valid customer id'})


    const check = await customerModel.findById({_id: customerId}).select({_id:1})
    if(!check) return res.status(400).send({status:false, message: 'customer id is not present'})

    let cartCreated = await cardModel.create(data)
    return res.status(201).send({status:true, message: 'card successfully created', data:cartCreated})

    } catch (error) {
        res.status(500).send({status: false, message: error.message})
    }
}

const getCardDetails = async (req, res) => {
    try {
              let findCustomers = await cardModel.find({ Status: 'Active' }).populate("customerId", {_id: 0, __v: 0, createdAt: 0, updatedAt: 0, isDeleted: 0});
          
              if (findCustomers.length == 0) { return res.status(404).send({ status: false, message: "card doesn't exist" });
              }
              return res.status(200).send({ status: true, message: "Successfully getting card details", data: findCustomers });
            } catch (error) {
              res.status(500).send({ status: false, message: error.message });
            }
}
module.exports = {createCard, getCardDetails}