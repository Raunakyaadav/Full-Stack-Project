const mongoose =require('mongoose')

const categorySchema = new mongoose.Schema(
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
const CategoryModel = mongoose.model("category", categorySchema);

module.exports = CategoryModel ;