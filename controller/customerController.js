const jwt = require("jsonwebtoken");
const customerModel = require("../model/customerModel");
const uuid = require('uuid');
const { default: mongoose } = require("mongoose");



const createCustomer = async (req, res) => {
   
  try {
    let data = req.body;
    
    let {firstName,lastName,mobileNo,DOB,email,address,Status} = data;

    if (!Object.keys(data).length) {
      return res.status(400).send({ status: false, message: "no data found" });
    }

    if (!firstName)return res.status(400).send({ status: false, message: "Please enter the first name" });
    if (!(/^[A-Za-z]+$/i.test(firstName))) return res.status(400).send({status: false,message: "Please enter valid first name and should be character only"});
    if (!lastName) return res.status(400).send({ status: false, message: "Please enter the last name" });
    if (!(/^[A-Za-z]+$/i.test(lastName))) return res.status(400).send({status: false,message: "Please enter valid last name and should be character only"});
    if (!mobileNo) return res.status(400).send({ status: false, message: "Please enter the mobile number" });
    if (!(/^[0][1-9]\d{9}$|^[1-9]\d{9}$/g.test(mobileNo))) return res.status(400).send({status: false,message: "Please provide valid phone number..."});

    if (!DOB) return res.status(400).send({ status: false, message: "Please enter the DOB" });
    
    if (!email) return res.status(400).send({ status: false, message: "Please enter the email" });
    if (!(/^[a-z0-9]{1,}@g(oogle)?mail\.com$/.test(email))) return res.status(400).send({ status: false, message: "Please provide valid email..."});

    if (!address)return res.status(400).send({ status: false, message: "Please enter the address" });
    
    if (!Status) return res.status(400).send({ status: false, message: "Please enter the status" });
    if(!['Active', 'Inactive'].includes(Status)) return res.status(400).send({status:false, message:'Enter valid status'})    
        
    let checkMobile = await customerModel.findOne({ mobileNo: mobileNo });
    if(checkMobile) return res.status(409).send({ status: false, message: "mobile number already exist" });

    let checkEmail = await customerModel.findOne({ email: email });
    if (checkEmail) return res.status(409).send({ status: false, message: "email is already exist" });
    
    let customerId = uuid.v4()
    data.customerId = customerId

    let customerCreated = await customerModel.create(data)
    return res.status(201).send({status: true,message: "customer successfully created", data: customerCreated});
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};




const login = async (req, res) => {
  try {
    let data = req.body;
    let { email, mobileNo } = data;

    if (!Object.keys(data).length)
      return res.status(400).send({ status: false, message: "no data found" });

    if (!email) return res.status(400).send({ status: false, message: "Please enter the email" });
    if (!mobileNo) return res.status(400).send({ status: false, message: "Please enter the mobile number" });

    let findCustomer = await customerModel.findOne({ email: email });
    if (!findCustomer) return res.status(400).send({ status: false, message: "incorrect email" });

    if (mobileNo != findCustomer.mobileNo) return res.status(400).send({ status: false, message: "incorrect mobile number" });

    let token = jwt.sign(
      {
        customerId: findCustomer._id.toString()
      },
      
      'radon'
    );
    return res.status(200).send({status: true,message: "successfully created",token: token});
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};






const getCustomerdetail = async (req, res) => {
  try {
  
    let findCustomers = await customerModel.find({ isDeleted:false, Status: 'Active' })

    if (findCustomers.length == 0) { return res.status(404).send({ status: false, message: "customer doesn't exist" });
    }
    return res.status(200).send({ status: true, message: "Successfully getting customer details", data: findCustomers });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};






const deleteDetailsOfCustomer = async (req, res) => {
  try {
    let customerId = req.params.customerId;
    console.log(customerId);
    //========================================= validations for customerId=========================================

    if (!mongoose.isValidObjectId(customerId)) {
      return res.status(400).send({ status: false, message: "Please provide valid customer Id" });
    }

    //=====================================Checking the customer's existance in the Db=============================

    let checkCustomer = await customerModel.findOne({_id: customerId,isDeleted: false});

    if (!checkCustomer){
      return res.status(404).send({ status: false, message: "customer doesn't exist" });
    }

    //==============================after checking the deletion of the customer ===================================

    await customerModel.findOneAndUpdate({ _id: customerId },{ $set: { isDeleted: true, deletedAt: new Date() } },{ new: true });

    return res.status(200).send({ status: true, message: "Product Deleted Succesfully" });
  } catch (error) {
   
    return res.status(500).send({ status: false, message: error.message });
  }
}

module.exports = {
  createCustomer,
  login,
  getCustomerdetail,
  deleteDetailsOfCustomer
};