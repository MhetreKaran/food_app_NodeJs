const categoryModel = require("../models/categoryModel");

const createCategoryController = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;
    if (!title) {
      return res.status(500).send({
        success: false,
        message: "Please Provide Category Title",
      });
    }
    const newCategory = new categoryModel({ title, imageUrl });
    await newCategory.save();
    res.status(201).send({
      success: true,
      message: "Category Created",
      newCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Create Category API",
    });
  }
};

// GET ALL CATEGORY || GET
const getAllCategoryController = async(req,res) => {
    try {
        const categories = await categoryModel.find();
        if(!categories){
            return res.status(404).send({
               success:false,
               message:"no categories found" 
            })
        }
        res.status(200).send({
            success:true,
            totalCategories:categories.length,
            categories
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in get all category api"
        })
    }
}

module.exports = { createCategoryController, getAllCategoryController };
