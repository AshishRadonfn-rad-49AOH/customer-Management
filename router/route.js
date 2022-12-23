const express = require('express')
const router = express.Router()
const controller = require('../controller/customerController')
const custom = require('../controller/cardController')
const {auth} = require('../middleware/auth')
const {authrize} = require('../middleware/authenticate')

router.post('/create', controller.createCustomer)
router.post('/login', controller.login)
router.get('/get', controller.getCustomerdetail)
router.delete('/delete/:customerId',auth, authrize, controller.deleteDetailsOfCustomer)

router.post('/createCard', custom.createCard)
router.get('/getCard', custom.getCardDetails)

module.exports = router