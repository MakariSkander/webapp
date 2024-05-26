const asyncHandler = require("express-async-handler");
const Sensors = require("../models/sensorsModel");
const Values = require("../models/sensorsModel");
//get all sensors 
//get/api/sensors 
//access private 
const getsensors = asyncHandler(async (req, res) => {
    const sensors = await Sensors.find();
    res.status(200).json(sensors);
});
//get the value of the sensor 
//get the spacifique month for this reading 
//get the sensor value and the date   
const getphvalue = asyncHandler(async (req, res) => {
    const month = req.params.month; // Assuming the month is passed as a parameter in the URL

    const values = await Sensors.aggregate([
        {
            $match: {
                $expr: {
                    $eq: [{ $month: "$createdAt" }, Number(month)] // Filter documents where month is January (01)
                }
            }
        },
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                avgPh: { $avg: "$PH_level" }
            }
        },
        {
            $project: {
                _id: 0,
                name: "$_id",
                avgPh: 1
            }
        }

    ]);



    res.status(200).json({ values: values });
});

module.exports = getphvalue;



//temperature function      

const gettempvalue = asyncHandler(async (req, res) => {
    const month = req.params.month; // Assuming the month is passed as a parameter in the URL

    const values = await Sensors.aggregate([
        {
            $match: {
                $expr: {
                    $eq: [{ $month: "$createdAt" }, Number(month)] // Filter documents where month is January (01)
                }
            }
        },
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                avgtemp: { $avg: "$Tepmerature_level" }
            }
        },
        {
            $project: {
                _id: 0,
                name: "$_id",
                avgtemp: 1
            }
        }

    ]);



    res.status(200).json({ values: values });
});

module.exports = gettempvalue;

//dissolved oxygen function       

const getoxygenvalue = asyncHandler(async (req, res) => {
    const month = req.params.month; // Assuming the month is passed as a parameter in the URL

    const values = await Sensors.aggregate([
        {
            $match: {
                $expr: {
                    $eq: [{ $month: "$createdAt" }, Number(month)] // Filter documents where month is January (01)
                }
            }
        },
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                avgtoxygen: { $avg: "$Dissolved_oxygen_level" }
            }
        },
        {
            $project: {
                _id: 0,
                name: "$_id",
                avgtoxygen: 1
            }
        }

    ]);



    res.status(200).json({ values: values });
});

module.exports = getoxygenvalue;



//turbidity function 
const getturbvalue = asyncHandler(async (req, res) => {
    const month = req.params.month; // Assuming the month is passed as a parameter in the URL

    const values = await Sensors.aggregate([
        {
            $match: {
                $expr: {
                    $eq: [{ $month: "$createdAt" }, Number(month)] // Filter documents where month is January (01)
                }
            }
        },
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                avgtturb: { $avg: "$Turbidity_level" }
            }
        },
        {
            $project: {
                _id: 0,
                name: "$_id",
                avgtturb: 1
            }
        }

    ]);



    res.status(200).json({ values: values });
});

module.exports = getturbvalue;
//create new sensors 
//POST/api/sensors
//access private 
const Createsensor = asyncHandler(async (req, res) => {
    console.log("the request body id ", req.body);
    const { PH_level, Turbidity_level, Tepmerature_level, Dissolved_oxygen_level } = req.body;
    if (!PH_level || !Turbidity_level || !Tepmerature_level || !Dissolved_oxygen_level) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    try {
        const sensor = await Sensors.create({
            PH_level,
            Turbidity_level,
            Tepmerature_level,
            Dissolved_oxygen_level
          //  user_id: req.user.id,
        });
        res.status(201).json(sensor);
    } catch (error) {
        console.log(error)
    }
});

//get all sensors 
//DET/api/sensors /:id
//access private
const getsensor = asyncHandler(async (req, res) => {
    const sensor = await Sensors.findById(req.params.id);
    if (!sensor) {
        res.status(404);
        throw new Error("Sensor not found");
    }
    res.status(200).json(sensor);
});
//Update sensor by id 
//PUT/api/sensors /:id
//access private 
const updatesensors = asyncHandler(async (req, res) => {
    const sensor = await Sensors.findById(req.params.id);
    console.log("test update sensors function !!!!!!!!!!!!!");


    if (sensor.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("user don't have permission to update other user sensors");
    }

    const updatesensor = await Sensors.
        findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
    console.log("updatesensor:", updatesensor);

    res.status(200).json(updatesensor);
});
//delete sensor by id 
//delete/api/sensors/;id
//access private 
const deletesensros = asyncHandler(async (req, res) => {
    const sensor = await Sensors.findById(req.params.id);
    if (!sensor) {
        res.status(404);
        throw new Error("sensor not found");
    }
    if (sensor.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("user don't have permission to delet other sensor contacts ");
    }
    await sensor.deleteOne({ _id: req.params.id });
    res.status(200).json(sensor);
});




module.exports = {
    getsensors,
    Createsensor,
    getsensor,
    updatesensors,
    deletesensros,
    getphvalue,
    gettempvalue,
    getoxygenvalue,
    getturbvalue
};