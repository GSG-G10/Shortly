const connection = require('../config/connection');

const addUserQuery = (shortUrl) => {
  const sqlScript = {
    text: 'SELECT SHORT_URL FROM URLS WHERE SHORT_URL = $1',
    values: [shortUrl],
  };
  return connection.query(sqlScript).then((data) => data.rows.length !== 0);
};

module.exports = addUserQuery;
