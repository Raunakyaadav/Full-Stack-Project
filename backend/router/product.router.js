const express = require('express');
const fileUploder = require('express-fileupload')
const { create,get,getById ,update,status,deleted,stock,topSelling ,images} = require('../controller/product.controller');
const productRouter = express.Router();

productRouter.post("/create",fileUploder({createParentPath : true}), create);
productRouter.get("/",get);
productRouter.get("/:id",getById);
productRouter.patch("/status/:id",status);
productRouter.patch("/stock/:id",stock);
productRouter.patch("/topSelling/:id",topSelling);
productRouter.delete("/delete/:id",deleted);
productRouter.put("/update/:id",fileUploder({createParentPath : true}), update);
productRouter.patch("/images/:id",fileUploder({createParentPath : true}), images);


module.exports = productRouter ;