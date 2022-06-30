const {Router} = require("express");

const route = Router();

route.use('/users', require("./users"))
route.use('/category', require("./category"))
route.use('/brand', require("./brand"))
route.use('/product', require("./product"))
route.use('/invoice', require("./invoice"))

module.exports = route;