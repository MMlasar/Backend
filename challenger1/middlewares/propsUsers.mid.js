function propsusers(req, res, next) {
    const { name, mail } = req.body;

    if (!name || !mail) {
        return res.status(400).json({
            statuscode: 400,
            message: `${req.method} ${req.url} - name & mail are required`,
        });
    } else {
        return next();
    }
}

export default propsusers;
