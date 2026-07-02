const jwt = require("jsonwebtoken");
const AdminModel = require("../model/admin.model");

const adminController = {

  async login(req, res) {

    try {

      const { email, password } = req.body;

      // Check admin
      const admin = await AdminModel.findOne({ email });

      if (!admin) {
        return res.status(404).json({
          message: "admin not found",
        });
      }

      // Check password
      if (admin.password !== password) {
        return res.status(401).json({
          message: "invalid password",
        });
      }

      // Generate Access Token
      // const accessToken = jwt.sign(
      //   {
      //     id: admin._id,
      //     email: admin.email,
      //     role: admin.role || "admin",
      //   },
      //   process.env.ACCESS_TOKEN_SECRET,
      //   {
      //     expiresIn: "15m",
      //   }
      // );

      // Generate Refresh Token
      const refreshToken = jwt.sign(
        {
          id: admin._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: "7d",
        }
      );

      // Cookie Options
      const cookieOptions = {
        httpOnly: false,
        secure:false, // true in production
        sameSite: "strict",
      };


      res.cookie("admin_token", refreshToken, {
        ...cookieOptions,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      // Response
      res.status(200).json({
        message: "login successful",
        success: true,
        admin,
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message: "server error",
        success: false,
      });

    }
  },
  async logout(req,res){
    try {
    // Clear the admin_token cookie
    res.clearCookie("admin_token", {
      httpOnly: false,
      secure: false, // true in production
      sameSite: "strict",
    });

    res.status(200).json({ message: "Logout successful",success:true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during logout",success:false });
  }
  }

};

module.exports = adminController;