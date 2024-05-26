const asyncHandler =  require("express-async-handler");
const Profile = require("../models/profileModel");
//get all profiles
//get/api/profiles
//access private 
const getprofiles = asyncHandler(async(req, res) => {
    const profiles =await profile.find({ user_id: req.user.id });
    res.status(200).json(profiles);
});

//create new profile
//POST/api/profile
//access private 
const Createprofile =asyncHandler(async (req, res) => {
    console.log("the request body id ",req.body);
    const {name, Age, Address, Gender } = req.body;
    if(!name || !Age || !Address ){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const profile = await Profile.create ({
        name,
        Age,
        Address,
        Gender,
        user_id: req.user.id,
    });
    res.status(201).json(profile);
});

//get profile BY id 
//DET/api/profiles/:id
//access private
const getprofile = asyncHandler(async (req, res) => {
    const profile = await Profile.findById(req.params.id);
    if (!profile) {
        res.status(404);
        throw new Error("profile not found");
    }
    res.status(200).json(profile);
});
//Update profile by id 
//PUT/api/profiles /:id
//access private 
const updateprofile = asyncHandler(async(req, res) => {
    const profile = await Profile.findById(req.params.id);
    if (!profile) {
        res.status(404);
        throw new Error("profile not found");
    }
    if (profile.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error ("user don't have permission to update other user profile "); 
       }

    const updateprofile = await Profile.findByIdAndUpdate(
        req.params.id, 
        req.body,
        { new: true }
         );
    res.status(200).json(updateprofile);
});
//delete contacts 
//delete/api/contacts/;id
//access private 
const deleteprofile =asyncHandler(async(req, res) => {
    const profile = await Profile.findById(req.params.id);
    if (!profile) {
        res.status(404);
        throw new Error("profile not found");
    }
    if (profile.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error ("user don't have permission to delet other user profile "); 
       }
    await profile.deleteOne({_id: req.params.id });
     res.status(200).json(profile);
});


module.exports = {
    getprofile,
     Createprofile, 
     getprofiles, 
      updateprofile,
      deleteprofile};