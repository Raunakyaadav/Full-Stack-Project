require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
var cookieParser = require('cookie-parser')
const server = express();
server.use(cookieParser()) ;
const cors = require('cors')
server.use(cors({credentials:true})) ;
server.use(express.json());
const path = require("path");
server.use( express.static(path.join(__dirname, "public/")));
const port = process.env.PORT
const categoryRouter = require('./router/category-router');
const colorRouter = require('./router/color.router')
const brandRouter = require('./router/brand.router')
const productRouter = require('./router/product.router')
const adminRouter = require('./router/admin.router')
const userRouter = require('./router/user.router')
const cartRouter = require('./router/cart.router')
const orderRouter = require('./router/order.router')
server.use("/category",categoryRouter)
server.use('/color',colorRouter) ;
server.use('/brand',brandRouter) ;
server.use('/product',productRouter) ;
server.use('/admin',adminRouter) ;
server.use('/user',userRouter)
server.use('/cart',cartRouter)
server.use('/order',orderRouter)



mongoose
  .connect(process.env.Database_URL, { dbName: process.env.DB_NAME })
  .then(() => {
    console.log("database connected");
    server.listen(port, () => {
      console.log(`server is listing at ${port}`);
    });
  }).catch(
    (error)=>{
        console.log("something is wrong", error)
    }
  )
