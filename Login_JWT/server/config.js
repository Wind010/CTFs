const packageJson = require('./package.json');
require('dotenv').config(); // Load environment variables from .env file

/**
 * Pattern for config is:
 * key: process.env['KEY'] ?? default
 */
const config = {
    version: packageJson.version,
    name: packageJson.name,
    description: packageJson.description,

    nodeEnv: process.env['NODE_ENV'] ?? 'development',
    port: process.env.PORT ?? 3000,

    // Productions origin should be updated accordingly in actual production code.
    clientOrigins: {
        'test': process.env.DEV_ORIGIN ?? '*',
        'development': process.env['DEV_ORIGIN'] ?? '*',
        'production': process.env.PROD_ORIGIN ?? '*' // 'none'  
    },

    sessionIdLength: parseInt(process.env.SESSION_ID_LENGTH) ?? 8,
    secret_key: process.env.SECRET_KEY,
    flag: process.env.FLAG
}

//export default config
module.exports = config;