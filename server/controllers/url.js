const { checkUrlQuery, getOriginalUrlQuery } = require('../database/queries');

const redirectUrl = (req, res) => {
  const { shortUrl } = req.params;
  checkUrlQuery(shortUrl).then((exists) => {
    if (exists) {
      getOriginalUrlQuery(shortUrl).then((url) => {
        res.redirect(url);
      }).catch(() => res.status(500).send('Database error'));
    } else {
      res.status(400).send('Url doesn\'t exist');
    }
  }).catch(() => res.status(500).send('Database error'));
};

module.exports = redirectUrl;
