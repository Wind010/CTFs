const config = require('../../config');

exports.userContent = async (req, res) => {
  let htmlContent = `<h2>Welcome <u>${req.user.username}</u>!</h2>`;

  res.send(htmlContent);
}
