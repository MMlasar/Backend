function errorhandler(error, req, res, next) {
    console.log(error);

    const statusCode = error.statuscode || 500;

    return res.status(statusCode).json({
        statuscode: statusCode,
        message: `${req.method} ${req.url} ${error.message}`
    });
}

export default errorhandler;
