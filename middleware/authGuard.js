
const jwt = require('jsonwebtoken');

const authGuard = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ success: "false", message: "No token provided" });

    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ success: "false", message: "Incorrect token format provided" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
        req.user = decoded;
        next();
    }
    catch {
        return res.status(401).json({ success: "false", message: "Invalid token" });
    }

}

//for admins

const authGuardAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization;
    // console.log(authHeader)

    if (!authHeader) {
        return res.status(401).json({ success: "false", message: "Authentication token is missing" });
    }

    const tokenParts = authHeader.split(' ');

    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer' || !tokenParts[1]) {
        return res.status(401).json({ success: "false", message: "Authentication token is not in the correct format" });
    }

    const token = tokenParts[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
        req.user = decoded;

        if (!req.user.isAdmin) {
            return res.status(403).json({ success: "false", message: "Access denied: admin privileges required" });
        }
        req.user = decoded; 
        next();
    } catch (error) {
        return res.status(401).json({ success: "false", message: "Invalid authentication token" });
    }
};


const newAuthGuard = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("Authorization Header:", authHeader);

    if (!authHeader) {
        return res.status(401).json({ success: false, message: "No token provided." });
    }
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(401).json({ success: false, message: "Authorization format is Bearer <token>." });
    }

    const token = parts[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET); 
        req.user = decoded; 
        console.log(decoded)
        next();
    } catch (error) {
        console.error("Token verification failed:", error.message);
        return res.status(401).json({ success: false, message: "Invalid token." });
    }
};


module.exports = { authGuard, authGuardAdmin,newAuthGuard };