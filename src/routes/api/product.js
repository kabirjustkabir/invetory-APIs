const {Router} = require("express");
const authController = require('../../controllers/authController');
const productController = require('./../../controllers/productController');
const multer = require('multer')
const shortid = require('shortid')
const path = require('path')
const router = Router();

//console.log(path.join(path.dirname(__dirname),'../uploads'))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.join(path.dirname(__dirname),'../uploads'))
    },
    filename: function (req, file, cb) {
      //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, shortid.generate()+ '-'+ file.originalname)
    }
  })
const upload = multer({storage})
router.route('/')
    .post(authController.protect,authController.restrictTo('admin'),upload.array('productPictures'),productController.addProduct)
    .get(authController.protect,productController.getAllProducts)

module.exports = router;