// src/utils/notFoundOne.utils.js

const notFoundOne = (one) => {
    if (!one) {
        const error = new Error("Item not found");
        error.statusCode = 404;
        throw error;
    }
};

export default notFoundOne;
