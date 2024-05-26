const asyncHandler = require("express-async-handler");
const Company = require("../models/companyModel");

//get all companies
//get/api/companies
//access private 
const getCompanies = asyncHandler(async (req, res) => {
    const companies = await Company.find({ user_id: req.user.id});
    res.status(200).json(companies);
});

//create new company
//POST/api/companies
//access private 
const CreateCompany = asyncHandler(async (req, res) => {
    console.log("the request body id ", req.body);
    const { company_name, company_Address, email_address, fax_number, phone_number } = req.body;
    if (!company_name || !email_address || !phone_number) {
        res.status(400);
        throw new Error("company email ");
    }
    const company = await Company.create({
        company_name,
        company_Address,
        email_address,
        fax_number,
        phone_number,
        user_id: req.user.id,
    });
    res.status(201).json(company);
});

//get compqny by id 
//GET/api/company/:id
//access private
const getCompany = asyncHandler(async (req, res) => {
    const company = await Company.findById(req.params.id);
    if (!Company) {
        res.status(404);
        throw new Error("Company not found");
    }
    res.status(200).json(company);
});

//Update company
//PUT/api/company/:id 
//access private 
const updateCompany = asyncHandler(async (req, res) => {
    const company = await Company.findById(req.params.id);
    if (!company) {
        res.status(404);
        throw new Error("company not found");
    }
    if (company.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("user don't have permission to update other user company ");
    }

    const updateCompany = await Company.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(200).json(updateCompany);
});


//delete contacts 
//delete/api/contacts/:id
//access private 
const deleteCompany = asyncHandler(async (req, res) => {
    const company = await Company.findById(req.params.id);
    if (!company) {
        res.status(404);
        throw new Error("Company not found");
    }
    if (company.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("user don't have permission to delete other user company ");
    }
    await Company.deleteOne({ _id: req.params.id });
    res.status(200).json(company);
});



module.exports = {
    getCompany,
    CreateCompany,
    getCompanies,
    updateCompany,
    deleteCompany
};





