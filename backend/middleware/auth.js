const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    let token = req.headers['authorization'];
    if (!token) return res.status(403).json({ message: 'No token provided' });

    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Unauthorized!' });
        req.user = decoded;
        next();
    });
};

const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'Admin') {
        next();
    } else {
        res.status(403).json({ message: 'Require Admin Role!' });
    }
};

const isEmployee = (req, res, next) => {
    if (req.user && req.user.role === 'Employee') {
        next();
    } else {
        res.status(403).json({ message: 'Require Employee Role!' });
    }
};

module.exports = {
    verifyToken,
    isAdmin,
    isEmployee
};
