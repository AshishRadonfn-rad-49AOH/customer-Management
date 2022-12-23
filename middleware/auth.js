const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const customerModel = require("../model/customerModel")



//=========================================== Authentication ==================================================//


const authenticate = async function (req, res, next) {
  try {
    let token = req.headers["x-Api-Key"];
    if (!token) {
      token = req.headers["x-api-key"];
    }
    //If no token is present in the request header return error
    if (!token) {
      return res.status(400).send({ status: false, msg: "token must be present" });
    }

    let decodedToken = jwt.verify(token, "radon");
    console.log(decodedToken);
    if (!decodedToken) {
      return res.status(401).send({ status: false, msg: "token is invalid" });
    }
    req.customerId = decodedToken.customerId;
    next();
  }
  catch (error) {
    return res.status(500).send({ msg: " Server Error", error: error.message });
  }
}





//============================================ Authorization ==================================================//


const authorise = async function (req, res, next) {
  try {
    let customerId = req.params.customerId;

    if (!mongoose.isValidObjectId(customerId)) {
      return res.status(400).send({ status: false, msg: "BlogId must be a valid ObjectId" });
    }

    let blog = await customerModel.findById(customerId);
    console.log(blog);
    if (!blog) {
      return res.status(404).send({ status: false, msg: "blog does not exists in db collection" });
    }
    if (blog.isDeleted) {
      return res.status(404).send({ status: false, msg: "blog is already deleted" });
    }

    if (blog._id != req.customerId) {
      return res.status(403).send({ status: false, msg: 'author logged is not allowed to modify the requested users data' });
    }
    next();
  }
  catch (error) {
    return res.status(500).send({ msg: error.message });
  }
}



//====================================== Authorization for delete Query ==========================================//



module.exports = { authenticate, authorise }