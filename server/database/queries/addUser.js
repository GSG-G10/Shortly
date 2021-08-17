const connection = require('../config/connection');

const addUserQuery = (username) => {
  const sqlScript = {
    text: 'INSERT INTO USERS VALUES ($1);',
    values: [username],
  };
  connection.query(sqlScript);
};

module.exports = addUserQuery;
