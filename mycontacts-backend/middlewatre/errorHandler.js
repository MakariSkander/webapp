const{constants} = require("../constants");

const erroHandler = (err, req, res, next) => {

    const statusCode = res.statusCode ? res.statusCode : 500;
     switch(statusCode){
        case constants.VALIDATION_ERROR:
            res.json({title:"validations error", message: err.message , stackTrace: err.stack });

        case constants.NOT_FOUND:
            res.json({title:"not found ", message: err.message , stackTrace: err.stack });

        case constants.UNAUTHORIZED:
                res.json({title:"unauthorized", message: err.message , stackTrace: err.stack });
                
        case constants.FORBIDDEN:
                    res.json({title:"forbidden", message: err.message , stackTrace: err.stack });
                    case constants.SERVER_ERROR:
                        res.json({title:"", message: err.message , stackTrace: err.stack });
    


    default:
        console.log("NO ERROR, ALL good !");
        break;
     }
};
module.exports = erroHandler; 