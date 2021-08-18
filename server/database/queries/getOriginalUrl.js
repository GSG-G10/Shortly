const connection = require('../config/connection');

const getOriginalUrlQuery = (shortUrl) => {
  const sqlScript = {
    text: 'SELECT LONG_URL FROM URLS WHERE SHORT_URL = $1',
    values: [shortUrl],
  };
  return connection.query(sqlScript).then((data) => data.rows[0].long_url);
};

module.exports = getOriginalUrlQuery;
