const config = require('../../config');
const jwt = require('jsonwebtoken');

/**
 * Login issues a new JWT.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
function authenticateJwt(req, res, next) {
    const token = req.header('Authorization') ? req.header('Authorization').split(' ')[1] : null;
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    jwt.verify(token, config.secret_key, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Forbidden' });
      }
  
      req.user = user;
      next();
    });
}

module.exports = authenticateJwt;