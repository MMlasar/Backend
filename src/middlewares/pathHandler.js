import winston from "../utils/winston.utils.js";

const pathHandler = (req, res, next) => {
    const errorMessage = `${req.method} ${req.url} not found path`;
    winston.WARN(errorMessage);
    return res.json({
        statusCode: 404,
        message: `not found path`,
    });
};

export default pathHandler;
