const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "No token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Attach decoded user info to request for downstream handlers
        req.user = decoded;
        return next();
    } catch (err){
        return res.status(403).json({error: "Invalid token"});
    }
};

module.exports = authMiddleware;