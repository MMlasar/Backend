function has8charUtils(password) {
    if (password.length < 8) {
        const error = new Error("Password must have at least 8 characters");
        error.statuscode = 400;
        throw error;
    }
}

export default has8charUtils;
