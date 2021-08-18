const { checkUrlQuery, getOriginalUrlQuery } = require('../database/queries');

const redirectUrl = (req, res) => {
  const { shortUrl } = req.params;
  if (!/^\w{6}$/.test(shortUrl)) res.status(400).send('Invalid Url');
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
