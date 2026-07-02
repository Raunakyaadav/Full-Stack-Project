const mongoose =require('mongoose')

const brandSchema = new mongoose.Schema(
    {
        name :{
            type : String,
            required :true

        }, slug:{
            type : String,
            required:true 
        },
        image: {
            type : String,
            default : null
        },
        status :{
            type : Boolean,
            default : true
        }
    },
    {
        timestamps : true
    }
)
const BrandModel = mongoose.model("brand", brandSchema);

module.exports = BrandModel ;