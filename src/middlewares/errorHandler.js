import winston from "../utils/winston.utils.js";

const errorHandler = (error, req, res, next) => {
    if (!error.statusCode || error.statusCode === 500) {
        error.statusCode = 500;
        winston.ERROR(error.message);
    } else {
        winston.WARN(error.message);
    }
    return res.json({
        statusCode: error.statusCode || 500,
        message: `${req.method} ${req.url} ${error.message}`,
    });
};

export default errorHandler;
