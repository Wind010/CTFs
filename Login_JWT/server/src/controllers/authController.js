const config = require('../../config');
const jwt = require('jsonwebtoken');
const authHandler = require('../middleware/authHandler')

/**
 * Login issues a new JWT.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
exports.login = async (req, res) => {
  const { username, password } = req.body;
  const restrictedUsernames = ['admin'];

  if (!username) {
    res.status(400).json({ message: 'Invalid username' });
    return;
  }

  if (restrictedUsernames.includes(username.toLowerCase())) {
    res.status(400).json({ message: 'Admin is special!' });
    return;
  }

  if (!password) {
    res.status(400).json({ message: 'Invalid password' });
    return;
  }

  if (username && password) {
    // If authentication is successful, create a JWT
    const token = jwt.sign({ 'username': username}, config.secret_key, { expiresIn: '24h' });

    // Send the JWT as a response
    res.json({ token });
  } else {
    // If authentication fails, return an error
    res.status(401).json({ error: 'Authentication failed.  Username and password required.' });
  }
};


/**
 * Just use the middleware to validate JWT explicitly.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
// exports.authenticate = async (req, res) => {
//   authHandler.authenticateJWT();
//   const { username } = req.user;

//   res.json( { 'username': username })
// };
 