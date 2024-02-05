const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');
const userController = require('../controllers/userController');
const authenticateJwt = require('../middleware/authHandler');


// Route to login
router.post('/login', authController.login);

// Ideally split to different route files if not CTF.
router.get('/content', authenticateJwt, (req, res) => {
    const { username } = req.user;

    if (username === 'admin') {
        adminController.adminContent(req, res);
    } else {
        userController.userContent(req, res);
    }
});


module.exports = router;

