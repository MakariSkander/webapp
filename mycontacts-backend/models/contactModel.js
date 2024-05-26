const mongoose = require("mongoose");


const contactSchema = mongoose.Schema(
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
    email:{
        type: String, 
        required:[true , "Please write your email adress "],
    },
    password:{

        type: String, 
        required:[true , "Please enter your passworsd "],

    }, 

    userRole: {
        type: String,
        enum: ['ADMIN', 'OPERATOR'],
        required: [true, "Please select userb type "],
    },



},{
    timestamps:true, 
}
);
module.exports = mongoose.model("contact", contactSchema);