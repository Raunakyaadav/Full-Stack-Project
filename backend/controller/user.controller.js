const jwt = require("jsonwebtoken");
const userModel = require("../model/user.model");
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.SecretKey);


const userController = {
  async register(req, res) {
    try {
    const {name, email, password } = req.body;
      const existUser = await userModel.findOne({ email });
      const encryptPass = cryptr.encrypt(password);
      if (existUser) {
        return res.status(404).json({
          msg: "Try with different email",
        });
      }
      const user = await userModel.create({name,email,password:encryptPass})
      await user.save()
     
      const token = jwt.sign( {id: user._id,},
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d",}
      );
                                                         
           
      // Response
      res.status(200).json({
        msg: "account create successful",
        success: true,
        user:{...user._doc,password:null},
        token,
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        msg: "server error",
        success: false,
      });

    }
  },
  async login(req,res){
    try {
        const {email,password} = req.body ;
        const user = await userModel.findOne({email})

        if(!user) {
             return res.status(404).json({
          msg: "User not found",
          success : false
        });
        }
        const decryptedPass = cryptr.decrypt(user.password);
        if(password !=decryptedPass){
              return res.status(404).json({
          msg: "Password didn't match",
          success : false
        });
        }
           const token = jwt.sign( {id: user._id,},
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d",}
      );
                                                         
           
      // Response
      res.status(200).json({
        msg: "Login successful",
        success: true,
        user:{...user._doc,password:null},
        token,
      });

    } catch (error) {
        console.log(error)
         res.status(500).json({
        msg: "server error",
        success: false,
      });
    }
  },
   async updateAddress(req, res) {
    try {
      const userId = req.params.id; // from auth middleware

      const {
        street,city,state,postalCode,country} = req.body;

      // Validation
      if (
        !street || !city || !state || !postalCode || !country
      ) {
        return res.status(400).json({
          success: false,
          message: "All address fields are required",
        });
      }

      const user = await userModel.findById(userId);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      const address = {
        street,
        city,
        state,
        postalCode,
        country,
      };

      // Replace existing address
      user.shipping_address.push(address);

      await user.save();

      return res.status(200).json({
        success: true,
        message: "Address updated successfully",
        shipping_address: user.shipping_address,
      });
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
 

};

module.exports = userController;