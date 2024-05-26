const mongoose = require("mongoose");


const watersystemSchema = mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        name: {
            type: String,
            required: [true, "Please write your system name "],

        },
        description: {
            type: String,
            required: [true, "Please write your email adress "],
        },
        installation_date: {

            type: String,
            required: [true],

        },

        machine_learning_model_desicion: {
            type: String,
            required: [false],
        },


        energy_consumption: {
            type: String,
            required: [false],
        },

    }, {
    timestamps: true,
}
);
module.exports = mongoose.model("watersystem", watersystemSchema);