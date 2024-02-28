function isValidPass(formpassword, dbpassword) {
    if (formpassword!==dbpassword) {
        const error = new Error ("Invalid credentials");
        error.statuscode = 401;
        throw error;
    }
}

export default isValidPass;