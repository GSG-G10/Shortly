const { addUserQuery } = require('../database/queries');

const userLogin = (req, res) => {
  addUserQuery(req.params).then(() => res.send('User signed up')).catch(() => res.send('User logged in'));
};

module.exports = userLogin;
