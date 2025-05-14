const jwt = require('jsonwebtoken')

const requireAuth = (req, res, next) => {
    const token = req.header.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).send({ message: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (e) {
        res.status(400).send({ message: "Invalid token" });
    }
}