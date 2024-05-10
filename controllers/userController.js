const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

// GET USER INFO
const getUserController = async (req, res) => {
  try {
    //find user
    const user = await userModel.findById(
      { _id: req.body.id },
      { _id: 0, password: 0 }
    );
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }
    res.status(200).send({
      success: true,
      message: "User get Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in GET User API",
      error,
    });
  }
};
//UPDATE USER
const updateUserController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.id });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }
    //update
    const { userName, address, phone } = req.body;
    if (userName) user.userName = userName;
    if (address) user.address = address;
    if (phone) user.phone = phone;
    //save user
    await user.save();
    res.status(200).send({
      success: true,
      message: "User Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Update User API",
      error,
    });
  }
};

//password update
const updatePasswordController = async (req, res) => {
  try {
    //find user
    const user = await userModel.findById({ _id: req.body.id });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }
    //get data from user
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(500).send({
        success: false,
        message: "Please Provide Old or New Password",
      });
    }
    //check user password | compare password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(404).send({
        success: false,
        message: "Please Enter correct Old Password",
      });
    }
    //hashing password
    let salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).send({
        success:true,
        message:'Password Updated!'
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Password Update API",
      error,
    });
  }
};
//delete user
const deleteUserController = async(req,res) =>{
    try {
        const user = await userModel.findById(req.params?.id);
        if(!user){
            return res.status(404).send({
                success:false,
                message:"User Not Found Invalid User Id"
            })
        }
        await userModel.deleteOne(user);
        return res.status(200).send({
            success:true,
            message:'Your account has been deleted'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error In Delete User API',
            error
        })
    }
}
module.exports = {
  getUserController,
  updateUserController,
  updatePasswordController,
  deleteUserController,
};
