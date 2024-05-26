const mongoose = require("mongoose");


const profileSchema = mongoose.Schema(
    {
        user_id:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
    name:{
        type: String, 
        required:[true , "Please write your name "],
    },
    Age:{
        type: String, 
        required:[true , "Please write your Age "],
    },
    Gender:{
        type: String, 
        required:[false],
    }, 
    Address: {
        type: String,
        required: [false],
    },

}, {
    timestamps: true,
}
);
module.exports = mongoose.model("profile", profileSchema);