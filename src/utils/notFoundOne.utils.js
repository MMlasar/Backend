function notFoundOne (one){ 
    if (!one) {
        const error = new Error("there isn't any document");
        error.statusCode = 404;
        throw error;
    }
    return one;
}


export default notFoundOne;