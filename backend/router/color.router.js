const express = require('express');
const colorRouter = express.Router() ;
const verifyToken = require('../authMiddleware.js') ;
const { create,get,getById ,update,status,deleted } = require('../controller/color.controller');

colorRouter.post("/create", verifyToken, create);
colorRouter.get("/", get);
colorRouter.get("/:id", getById);
colorRouter.patch("/status/:id", status);
colorRouter.delete("/delete/:id",  deleted);
colorRouter.put("/update/:id", update);

module.exports = colorRouter