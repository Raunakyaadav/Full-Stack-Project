const mongoose = require("mongoose");

const colorSchema = new mongoose.Schema({
name :{
    type : String ,
    reuired : true,
    unique : true
},
slug :{
    type : String ,
    required : true,
    unique : true
},
hexcode :{
    type : String,
    unique :true ,
    required : true 
},
status : {
    type : Boolean ,
    deafault :true
}
})

const ColorModel = mongoose.model("colors",colorSchema);
module.exports =  ColorModel ;