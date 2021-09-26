var jwt = require('jsonwebtoken');
const JWT_SECRET = 'SailySecret';

const fetchuser = (req, res, next) => {
    // get user from jwt token & add id to request obj
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: 'Please authenticate using a valid token' });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        console.log(data);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate using a valid token' });
    }
}

module.exports = fetchuser;