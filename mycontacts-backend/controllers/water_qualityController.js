const asyncHandler =  require("express-async-handler");
const Watersystem = require("../models/water_quality_system_model");
//get all watersystems 
//get/api/watersystems
//access private 
const getwatersystems= asyncHandler(async(req, res) => {
    const watersystems =await Watersystem.find({ user_id: req.user.id });
    res.status(200).json(watersystems);
});

//create new contacts 
//POST/api/contacts 
//access private 
const Createwatersystems = asyncHandler(async (req, res) => {
    console.log("the request body id ",req.body);
    const {name, description, installation_date } = req.body;
    if(!name || !description || !installation_date ){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const watersystem = await Watersystem.create ({
        name,
        description,
        installation_date,
        user_id: req.user.id,
    });
    res.status(201).json(watersystem);
});

//get watersystem  by id 
//DET/api/watersystem /:id
//access private
const getwatersystem = asyncHandler(async (req, res) => {
    const watersystem = await watersystem.findById(req.params.id);
    if (!watersystem) {
        res.status(404);
        throw new Error("watersystem not found");
    }
    res.status(200).json(watersystem);
});
//Update watersystem
//PUT/api/watersystem/:id
//access private 
const updatewatersystems = asyncHandler(async(req, res) => {
    const watersystem = await Watersystem.findById(req.params.id);
    if (!watersystem) {
        res.status(404);
        throw new Error("watersystem  not found");
    }
    if (watersystem.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error ("user don't have permission to update other user watersystem "); 
       }

    const updatewatersystems = await Watersystem.findByIdAndUpdate(
        req.params.id, 
        req.body,
        { new: true }
         );
    res.status(200).json(updatewatersystems);
});
//delete watersystem
//delete/api/watersystems/;id
//access private 
const deletewatersystems =asyncHandler(async(req, res) => {
    const watersystems= await Watersystem.findById(req.params.id);
    if (!watersystems) {
        res.status(404);
        throw new Error("watersystem not found");
    }
    if (watersystems.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error ("user don't have permission to delete other user watersystem"); 
       }
    await Watersystem.deleteOne({_id: req.params.id });
    res.status(200).json(watersystems);
});




module.exports = {
    getwatersystems,
     Createwatersystems, 
     getwatersystem, 
      updatewatersystems,
      deletewatersystems};