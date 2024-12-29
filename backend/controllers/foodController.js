import foodModel from "../models/foodModel.js";
import fs from 'fs'


//add food item
const addFood = async (req,res) => {
    let image_filename = `${req.file.filename}`; //Storing uploaded filename
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    })
    try {
        await food.save();
        res.json({success:true, message:"Food Added"}) //If product is saved we will get this response
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})// or else we will get this if product not saved
    }
}

// all food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({success:true, data:foods})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

// remove food item
const removeFood = async(req, res) => {
    try {
        const food = await foodModel.findById(req.body.id); //To find food model using ID
        fs.unlink(`uploads/${food.image}`, ()=>{}) //To delete image form uploads folder

        await foodModel.findByIdAndDelete(req.body.id); //To delete food item data from mongodb
        res.json({success:true, message:"Food Removed"})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

export {addFood, listFood, removeFood}