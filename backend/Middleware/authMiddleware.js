const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.header(process.env.ACCESS_TOKEN_NAME);
    // console.log(token);
    if (!token) return res.status(401).json({ message: "Access Denied" });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        console.log('after verify', verified)
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: "Invalid Token" });
    }
};

module.exports = { verifyToken };
