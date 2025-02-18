const asyncHandler =  require("express-async-handler");
const Contact = require("../models/contactModel");
//get all contacts 
//get/api/contacts 
//access private 
const getContacts = asyncHandler(async(req, res) => {
    const contacts =await Contact.find({ user_id: req.user.id });
    res.status(200).json(contacts);
});

//create new contacts 
//POST/api/contacts 
//access private 
const CreateContact =asyncHandler(async (req, res) => {
    console.log("the request body id ",req.body);
    const {name, email, phone } = req.body;
    if(!name || !email || !phone ){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const contact = await Contact.create ({
        name,
        email,
        phone,
        user_id: req.user.id,
    });
    res.status(201).json(contact );
});

//get all contacts 
//DET/api/contacts /:id
//access private
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});
//Update contacts 
//PUT/api/contacts /:id
//access private 
const updateContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    if (contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error ("user don't have permission to update other user contacts "); 
       }

    const updateContact = await Contact.findByIdAndUpdate(
        req.params.id, 
        req.body,
        { new: true }
         );
    res.status(200).json(updateContact);
});
//delete contacts 
//delete/api/contacts/;id
//access private 
const deleteContact =asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    if (contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error ("user don't have permission to delete other user contacts "); 
       }
    await Contact.deleteOne({_id: req.params.id });
    res.status(200).json(contact);
});




module.exports = {
    getContacts,
     CreateContact, 
     getContact, 
      updateContact,
      deleteContact};