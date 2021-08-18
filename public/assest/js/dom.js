const inputUserName = document.querySelector('.login-form-input');
const submitUserName = document.querySelector('.login-form-btn');
const loginSection = document.querySelector('.login');
const navbarList = document.querySelector('.navbar-list');
const convertSection = document.querySelector('.convert');
const urlList = document.querySelector('.url-list');
const convertFormBtn = document.querySelector('.convert-form-btn');
const convertFormInput = document.querySelector('.convert-form-input');
const welcomeUser = document.querySelector('.welcome-user');

let userName = '';

const loginProccess = () => {
  loginSection.style.display = 'none';
  navbarList.style.display = 'block';
  convertSection.style.display = 'block';
  urlList.style.display = 'block';
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
// /addUrl
convertFormInput.onchange = () => {
  originalUrl = convertFormInput.value.trim();
  console.log(originalUrl);
  fetch('user/addUrl', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userName, originalUrl }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
};
