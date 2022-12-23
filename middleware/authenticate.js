const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')



const authrize = async function(req,res,next){
    try{
        let header = req.headers
        let token = header['token'];
        let decodeToken = jwt.decode(token)

        let customerId = req.params.customerId
        if(!mongoose.Types.ObjectId(customerId)) return res.status(400).send({status:false , message:"Please Enter Valid customer Id"})
        if(decodeToken.hasOwnProperty('customerId') && customerId != decodeToken.customerId ) return res.status(403).send({status:false , message:"only customer can do this"})
        next()
    }
    catch(error)
    {
        res.status(500).send({status:false , message:error.message});
    }
}

module.exports = {authrize}