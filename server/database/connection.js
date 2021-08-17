const { Pool } = require('pg');

require('env2')('config.env');

const { DB_URL } = process.env;

if (!DB_URL) throw new Error('There is no Database');

const options = {
  connectionString: DB_URL,
  ssl: false,
};

module.exports = new Pool(options);
