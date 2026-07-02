const express = require('express');
const cartRouter = express.Router();
const { dbtocart,addCart,deleteItem} = require('../controller/cart.controller');

 cartRouter.post("/dbtocart",dbtocart )
 cartRouter.post("/add-cart",addCart )
 cartRouter.post("/delete/:id",deleteItem ) 

module.exports = cartRouter ; 