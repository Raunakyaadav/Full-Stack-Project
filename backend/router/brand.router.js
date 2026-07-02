const express = require('express');
const fileUploder = require('express-fileupload')
const { create,get,getById ,update,status,deleted } = require('../controller/brand.controller');
const brandRouter = express.Router();

brandRouter.post("/create",fileUploder({createParentPath : true}), create);
brandRouter.get("/",get);
brandRouter.get("/:id",getById);
brandRouter.patch("/status/:id",status);
brandRouter.delete("/delete/:id",deleted);
brandRouter.put("/update/:id",fileUploder({createParentPath : true}), update);


module.exports = brandRouter ;