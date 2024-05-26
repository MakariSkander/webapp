const express = require("express");
const router = express.Router();
const {  getCompanies,
    CreateCompany, 
    getCompany, 
     updateCompany,
     deleteCompany
    } = require("../controllers/companyController");
const validateToken = require("../middlewatre/validateTokenHandler");
router.use(validateToken);
router.route ("/").get (getCompanies).post (CreateCompany);
router.route ("/:id").get (getCompany).put (updateCompany).delete (deleteCompany);
module.exports = router;
