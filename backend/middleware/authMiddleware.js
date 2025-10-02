const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "No token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
    }catch (err){
        res.status(403).json({error: "Invalid token"});
    }
};

module.exports = authMiddleware;