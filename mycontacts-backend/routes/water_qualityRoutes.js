const express = require("express");
const router = express.Router();
const { getwatersystems,
    Createwatersystems,
    getwatersystem,
    updatewatersystems,
    deletewatersystems
} = require("../controllers/water_qualityController");
const validateToken = require("../middlewatre/validateTokenHandler");
router.use(validateToken);
router.route("/").get(getwatersystems).post(Createwatersystems);
router.route("/:id").get(getwatersystem).put(updatewatersystems).delete(deletewatersystems);
module.exports = router;
