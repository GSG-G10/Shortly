const {
  addUserQuery, getShortUrlQuery, checkUserQuery, checkUrlQuery, addUrlQuery, checkUserUrlQuery,
} = require('../database/queries');

const userLogin = (req, res) => {
  const { userName } = req.body;
  if (!/^[a-zA-Z]{3,10}[0-9]{0,10} {1}[a-zA-Z]{3,20}[0-9]{0,10}$/.test(userName)) res.status(400).json({ massege: 'Invalid userName' });
  console.log('User Name is: ', userName);
  addUserQuery(userName).then(() => res.status(200).json({ massege: 'User signed up' })).catch(() => res.status(200).json({ massege:'User logged in' }));
};

const getUserLinks = (req, res) => {
  const { userName } = req.params;
  if (!/^[a-zA-Z]{3,10}[0-9]{0,10} {1}[a-zA-Z]{3,20}[0-9]{0,10}$/.test(userName)) res.status(400).send('Invalid userName');
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
  if (!/^[a-zA-Z]{3,10}[0-9]{0,10} {1}[a-zA-Z]{3,20}[0-9]{0,10}$/.test(userName)) res.status(400).json({ massege: 'Invalid userName' });
  if (!/^https{0,1}:\/\//.test(originalUrl)) res.status(400).json({ massege: 'Invalid Url' });
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
