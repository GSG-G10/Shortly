const {
  addUserQuery, getShortUrlQuery, checkUserQuery, checkUrlQuery, addUrlQuery, checkUserUrlQuery,
} = require('../database/queries');

const userLogin = (req, res) => {
  const { userName } = req.body;
  addUserQuery(userName).then(() => res.status(200).send('User signed up')).catch(() => res.status(200).send('User logged in'));
};

const getUserLinks = (req, res) => {
  const { userName } = req.params;
  checkUserQuery(userName).then((exists) => {
    if (!exists) res.status(400).send('User doesn\'t exist');
    else {
      getShortUrlQuery(userName).then((data) => {
        if (data.rows.length === 0) res.status(200).send('User doesn\'t have urls');
        else {
          res.status(200).json(data.rows);
        }
      });
    }
  });
};

const generateShortUrl = (urlLength) => {
  const charSet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let shortUrl = '';
  for (let i = 0; i < urlLength; i += 1) {
    shortUrl += charSet.charAt(Math.floor(Math.random() * (charSet.length + 1)));
  }
  return checkUrlQuery(shortUrl).then((exists) => {
    if (!exists) return shortUrl;
    return generateShortUrl();
  });
};

const shortenUrl = (req, res) => {
  const { userName, originalUrl } = req.body;
  checkUserUrlQuery(userName, originalUrl).then((data) => {
    if (data.length !== 0) res.status(200).json(data[0]);
    else {
      checkUserQuery(userName).then((exists) => {
        if (!exists) res.status(400).send('User doesn\'t exist');
        else {
          generateShortUrl(6).then((shortUrl) => {
            addUrlQuery(userName, shortUrl, originalUrl)
              .then(() => res.status(200).json({ shortUrl }))
              .catch(() => res.status(500).send('Database error'));
          });
        }
      });
    }
  });
};

module.exports = { userLogin, getUserLinks, shortenUrl };
