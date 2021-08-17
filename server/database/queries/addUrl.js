const connection = require('../config/connection');

const addUrlQuery = (username, shortUrl, originalUrl) => {
  const sqlScript = {
    text: 'INSERT INTO URLS VALUES ($2 , $1 , $3);',
    values: [username, shortUrl, originalUrl],
  };
  return connection.query(sqlScript);
};

module.exports = addUrlQuery;
