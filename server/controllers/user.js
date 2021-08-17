const { addUserQuery } = require('../database/queries');

const userLogin = (req, res) => {
  addUserQuery(req.params).then(() => res.send('User logged in')).catch(() => res.send('User signed up'));
};

module.exports = userLogin;
