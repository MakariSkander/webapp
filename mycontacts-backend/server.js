const express = require("express");
const erroHandler = require("./middlewatre/errorhandler");
const connectDb = require("./config/dbConnection");
var cors = require('cors')
const app = express();

const dotenv = require("dotenv").config();
app.use(cors())

connectDb();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/company", require("./routes/companyRoutes"));
app.use("/api/profile", require("./routes/profileRoutes"));
app.use("/api/sensor", require("./routes/sensorsRoutes"));
app.use("/api/watersystems", require("./routes/water_qualityRoutes"));

app.use(erroHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
