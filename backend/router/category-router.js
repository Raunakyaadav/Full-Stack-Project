const express = require('express');
const fileUploder = require('express-fileupload')
const { create,get,getById ,update,status,deleted } = require('../controller/category.controller');
const categoryRouter = express.Router();

categoryRouter.post("/create",fileUploder({createParentPath : true}), create);
categoryRouter.get("/",get);
categoryRouter.get("/:id",getById);
categoryRouter.patch("/status/:id",status);
categoryRouter.delete("/delete/:id",deleted);
categoryRouter.put("/update/:id",fileUploder({createParentPath : true}), update);


module.exports = categoryRouter ;