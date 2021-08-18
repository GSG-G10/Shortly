const inputUserName = document.querySelector('.login-form-input');
const loginSection = document.querySelector('.login');
const navbarList = document.querySelector('.navbar-list');
const convertSection = document.querySelector('.convert');
const urlList = document.querySelector('.url-list');
const convertFormInput = document.querySelector('.convert-form-input');
const welcomeUser = document.querySelector('.welcome-user');
const shortedUrlSection = document.querySelector('.shorted-url-section');
const shortedUrl = document.querySelector('.url');

let userName = '';

const loginProccess = () => {
  loginSection.style.display = 'none';
  navbarList.style.display = 'flex';
  convertSection.style.display = 'flex';
  urlList.style.display = 'block';
  shortedUrlSection.style.display = 'flex';
  welcomeUser.textContent = `Hello ${userName}`;
};

inputUserName.onchange = () => {
  userName = inputUserName.value.trim();
  fetch('/user/loginUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userName }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.massege !== 'Invalid userName') loginProccess();
    })
    .catch((err) => err.massege);
};

const setUrlShorted = (data) => {
  const location = window.location.href;
  shortedUrl.textContent = `The New Url is: ${location}${data}`;
};
convertFormInput.onchange = () => {
  const originalUrl = convertFormInput.value.trim();
  fetch('user/addUrl', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userName, originalUrl }),
  })
    .then((response) => response.json())
    .then((data) => setUrlShorted(data.short_url))
    .catch((err) => err.massege);
};
