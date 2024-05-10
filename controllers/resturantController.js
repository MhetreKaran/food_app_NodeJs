const resturantModel = require("../models/resturantModel");

const createResturantController = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;
    if (!title || !coords) {
      return res.status(500).send({
        success: false,
        message: "Please Provide title and address",
      });
    }
    const newResturant = new resturantModel({
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });
    await newResturant.save();
    res.status(201).send({
      success: true,
      message: "New Resturant Created Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Create Resturant API",
      error,
    });
  }
};
//GET ALL RESTURNAT
const getAllResturantController = async (req, res) => {
  try {
    const resturnats = await resturantModel.find({});
    if (!resturnats) {
      return res.status(404).send({
        success: false,
        message: "No Resturant Available",
      });
    }
    res.status(200).send({
      success: true,
      totolCount: resturnats.length,
      resturnats,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Get all resturant API",
      error,
    });
  }
};
//GET RESTURANT BY ID
const getResturantByIdController = async(req,res)=>{
    try {
       const resturant = await resturantModel.findById(req.params?.id);
        if(!resturant){
            return res.status(404).send({
                success:false,
                message:"Resturant Not Found",
            })
        }
        res.status(200).send({
            success:true,
            resturant
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error In GET RESTURANT BY ID API",
            error
        })
    }
}
// DELETE RESTURANT
const deleteResturantController = async(req,res) =>{
    try {
        const resturantId = req.params?.id;
        if(!resturantId){
            return res.status(404).send({
                success:false,
                message:"Resturant Id is not found",
            })
        }
        await resturantModel.findByIdAndDelete(resturantId);
        res.status(200).send({
            success:true,
            message:"Resturant Delete Successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error In Delete Resturant API"
        })
    }

}
module.exports = {
  createResturantController,
  getAllResturantController,
  getResturantByIdController,
  deleteResturantController,
};
