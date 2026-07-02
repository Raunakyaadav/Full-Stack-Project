const express = require('express');
const userRouter = express.Router();
const { register,login,updateAddress } = require('../controller/user.controller');

 userRouter.post('/register',register )
 userRouter.post('/login',login )
 userRouter.put('/address/:id', updateAddress )

module.exports = userRouter ; 