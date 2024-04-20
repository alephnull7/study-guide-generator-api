const { admin } = require('../config/fireBase');
const controlService = require('../controllers/helpers/helpers');

async function authenticateUser(req, res, next) {
    const { authorization } = req.headers;
    console.log(authorization);

    if (!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const idToken = authorization.split('Bearer ')[1];

    try {
        req.user = await admin.auth().verifyIdToken(idToken);
        return next();
    } catch (error) {
        console.error('Error verifying Firebase ID token:', error);
        return controlService(req, res, 2);
    }
}

module.exports = authenticateUser;
