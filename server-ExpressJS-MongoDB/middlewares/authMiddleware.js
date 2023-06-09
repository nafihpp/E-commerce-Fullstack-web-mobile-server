const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET_KEY;

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "You're not logged in" });
    }

    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
        return res
            .status(401)
            .json({ message: "Authorization header format is invalid" });
    }

    const token = parts[1];
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid token" });
        }
        req.user = decoded;
        next();
    });
}

module.exports = authMiddleware;
