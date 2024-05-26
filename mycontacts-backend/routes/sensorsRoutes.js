const express = require("express");
const router = express.Router();
const {
    getsensor,
    Createsensor,
    getsensors,
    updatesensors,
    deletesensros,
    getphvalue,
    gettempvalue,
    getoxygenvalue,
    getturbvalue

} = require("../controllers/SensorsController");
// const validateToken = require("../middlewatre/validateTokenHandler");
// router.use(validateToken);
router.route("/").get(getsensors).post(Createsensor);
router.route("/getphvalue/:month").get(getphvalue);
router.route("/gettempvalue/:month").get(gettempvalue);
router.route("/getoxygenvalue/:month").get(getoxygenvalue);
router.route("/getturbvalue/:month").get(getturbvalue);


router.route("/:id").get(getsensor).put(updatesensors).delete(deletesensros);
module.exports = router;
