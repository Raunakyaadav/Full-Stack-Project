const express = require('express');
const orderRouter = express.Router();
const {orderPlace } = require('../controller/order.controller');

 orderRouter.post('/place-order',orderPlace )


module.exports = orderRouter ; 