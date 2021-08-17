const { addUserQuery, getShortUrlQuery } = require('../database/queries');

const userLogin = (req, res) => {
  addUserQuery(req.params).then(() => res.status(200).send('User signed up')).catch(() => res.status(200).send('User logged in'));
};

const getUserLinks = (req, res) => {
  getShortUrlQuery(req.body.userName).then((data) => {
    if (data.rows.length === 0) res.status(400).send('User doesn\'t have urls or doesn\'t exist');
    else {
      res.status(200).json(data.rows);
    }
  });
};

module.exports = { userLogin, getUserLinks };
