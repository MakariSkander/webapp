const mongoose = require("mongoose");
const companySchema = mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    company_name: {
        type: String,
        required: [true, "Please write your company  name "],

    },
    company_Address: {
        type: String,
        required: [true, "enter your company address"],
    },

    email_address: {
        type: String,
        required: [true, "enter your company email address"],
    },
    fax_number: {
        type: String,
        required: [false],
    },
    phone_number: {
        type: String,
        required: [true, "enter your company phone number "],
    },
});
module.exports = mongoose.model("Company", companySchema);

