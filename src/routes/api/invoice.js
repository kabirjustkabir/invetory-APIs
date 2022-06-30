const {Router} = require("express");
const authController = require('./../../controllers/authController')
const orderController = require('./../../controllers/OderController')
const router = Router();

router.post('/placeOrder',authController.protect,authController.restrictTo('user'),orderController.placeOrder)




module.exports = router;