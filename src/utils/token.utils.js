// src/utils/token.utils.js
import jwt from "jsonwebtoken";

const createToken = (data) => {
    const expiresIn = 60 * 60 * 24 * 7; // 1 week in seconds
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
            // Handle token verification failure
            throw new Error("Token verification failed");
        }
    } else {
        // Handle case where no token is provided
        throw new Error("No token provided");
    }
};

export { createToken, verifyToken };
