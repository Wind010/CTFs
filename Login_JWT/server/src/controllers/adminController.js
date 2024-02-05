const config = require('../../config');


exports.adminContent = async (req, res) => {
    let htmlContent = `<h2>Nice to see you again <u>${req.user.username}</u>!<h2>`;
    htmlContent += `<p>Your flag:  ${config.flag}</p>`
    res.send(htmlContent);}
