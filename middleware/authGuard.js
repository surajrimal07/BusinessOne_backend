
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

    if (!authHeader) {
        return res.status(401).json({ success: "false", message: "No token provided" });


    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ success: "false", message: "Incorrect token format provided" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        if (!req.user.isAdmin) {
            return res.status(403).json({ success: "false", message: "You are not authorized to access this resource" });
        }
        next();
    }
    catch {
        return res.status(401).json({ success: "false", message: "Invalid token" });
    }

}

module.exports = { authGuard, authGuardAdmin };