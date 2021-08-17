const connection = require('../config/connection');

const getShortUrlQuery = (userName) => {
  const sqlScript = {
    text: 'SELECT SHORT_URL FROM URLS WHERE USER_NAME = $1',
    values: [userName],
  };
  return connection.query(sqlScript);
};

module.exports = getShortUrlQuery;
