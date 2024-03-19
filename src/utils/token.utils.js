import jwt from "jsonwebtoken";

const createToken = (data) => {
    const expiresIn = 60 * 60 * 24 * 7;
    const expirationDate = Math.floor(Date.now() / 1000) + expiresIn;
    const token = jwt.sign(
        { ...data, exp: expirationDate },
        process.env.SECRET
    );
    return token;
};


const verifyToken = (token) => {
    if (token) {
        try {
            const data = jwt.verify(token, process.env.SECRET);
            return data;
        } catch (error) {
            // Manejar el caso en que la verificación del token falle
            throw new Error("Token verification failed");
        }
    } else {
        // Manejar el caso en que no se proporciona un token
        throw new Error("No token provided");
    }
};

export { createToken, verifyToken };
