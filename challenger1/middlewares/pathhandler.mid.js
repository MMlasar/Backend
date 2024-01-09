function pathhandler (req,res,next){
    return res.json({
        statuscode:404,
        message: `${req.method} ${req.url} not found endpoint`
    })
}

export default pathhandler