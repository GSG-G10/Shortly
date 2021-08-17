const connection = require('../config/connection');

const checkUserUrlQuery = (userName, url) => {
  const sqlScript = {
    text: 'SELECT SHORT_URL FROM URLS WHERE LONG_URL = $2 AND USER_NAME = $1',
    values: [userName, url],
  };
  return connection.query(sqlScript).then((data) => data.rows);
};

module.exports = checkUserUrlQuery;
