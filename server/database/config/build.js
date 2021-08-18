const { join } = require('path');

const { readFileSync } = require('fs');

const connection = require('./connection');

const sql = readFileSync(join(__dirname, 'database.sql')).toString();
console.log(sql);

module.exports = () => {
  connection
    .query(sql)
    .then(() => console.log('DB build success'))
    .catch(() => console.log('DB build worng'));
};
