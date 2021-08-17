const { checkUrlQuery, getOriginalUrlQuery } = require('../database/queries');

const redirectUrl = (req, res) => {
  const { shortUrl } = req.body;
  checkUrlQuery(shortUrl).then((exists) => {
    if (exists) {
      getOriginalUrlQuery(shortUrl).then((url) => {
        res.redirect(url);
      }).catch(() => res.status(500).send());
    } else {
      res.status(400).send();
    }
  }).catch(() => res.status(500).send());
};

module.exports = redirectUrl;
