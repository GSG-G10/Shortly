const connection = require('../config/connection');

const checkUserQuery = (userName) => {
  const sqlScript = {
    text: 'SELECT NAME FROM USERS WHERE NAME = $1',
    values: [userName],
  };
  return connection.query(sqlScript).then((data) => data.rows.length !== 0);
};

module.exports = checkUserQuery;
