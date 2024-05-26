const mongoose = require("mongoose");


const sensorsSchema = mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
           // required: true,
            ref: "User",
        },
        PH_level: {
            type: Number,
        },
        Turbidity_level: {
            type: Number,
        },
        Tepmerature_level: {
            type: Number,
        },
        Dissolved_oxygen_level: {
            type: Number,
        },

    }, {
    timestamps: true,
}
);
module.exports = mongoose.model("Sensors", sensorsSchema);