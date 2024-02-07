const config = require('../../config');


exports.ping = async (req, res) => {
    res.json({ message: "I'm awake stop poking me!" });
}
