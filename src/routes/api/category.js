const {Router} = require("express");
const categoryController = require('./../../controllers/categoryController')
const authController = require('../../controllers/authController')

const router = Router();

router.route('/')
    .post(authController.protect,authController.restrictTo('admin'),categoryController.addCategory)
    .get(authController.protect,categoryController.getCategories)

router.route('/:id')
    .patch(authController.protect,authController.restrictTo('admin'),categoryController.updateCategory)


module.exports = router;