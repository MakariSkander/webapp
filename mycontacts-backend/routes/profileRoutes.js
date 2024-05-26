const express = require("express");
const router = express.Router();
const {getprofiles,
    Createprofile, 
    getprofile, 
     updateprofile,
     deleteprofile
    } = require("../controllers/profileController");
const validateToken = require("../middlewatre/validateTokenHandler");
router.use(validateToken);
router.route ("/").get (getprofiles).post (Createprofile);
router.route ("/:id").get (getprofile).put (updateprofile).delete (deleteprofile);
module.exports = router;
