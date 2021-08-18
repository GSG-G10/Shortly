const inputUserName = document.querySelector('.login-form-input');
const loginSection = document.querySelector('.login');
const navbarList = document.querySelector('.navbar-list');
const convertSection = document.querySelector('.convert');
const urlList = document.querySelector('.url-list');
const convertFormInput = document.querySelector('.convert-form-input');
const welcomeUser = document.querySelector('.welcome-user');
const shortedUrlSection = document.querySelector('.shorted-url-section');
const shortedUrl = document.querySelector('.url');
const tableHover = document.querySelector('.table-hover');

let userName = '';

const loginProccess = () => {
  loginSection.style.display = 'none';
  navbarList.style.display = 'flex';
  convertSection.style.display = 'flex';
  urlList.style.display = 'block';
  shortedUrlSection.style.display = 'flex';
  welcomeUser.textContent = `Hello ${userName}`;
};

const createTable = (urls) => {
  while (tableHover.firstChild) tableHover.removeChild(tableHover.firstChild);

  for (let i = 0; i < urls.length; i += 1) {
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    td1.className = 'text-left';
    td1.innerText = i + 1;
    td2.className = 'text-left';
    const anchor = document.createElement('a');
    anchor.href = `${location}url/${urls[i].short_url}`;
    anchor.innerText = `${location}url/${urls[i].short_url}`;
    anchor.setAttribute('target', '_blank');
    tr.appendChild(td1);
    tr.appendChild(td2);
    td2.appendChild(anchor);
    tableHover.appendChild(tr);
  }
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
    }).then(() => {
      fetch(`/user/${userName}`).then((data) => data.json()).then((urls) => {
        createTable(urls);
      });
    })
    .catch((err) => err.massege);
};

const setUrlShorted = (data) => {
  const location = window.location.href;
  shortedUrl.textContent = `The New Url is: ${location}url/${data}`;
  shortedUrl.href = `${location}url/${data}`;
  shortedUrl.setAttribute('target', 'blank');
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
    .then(() => {
      fetch(`/user/${userName}`).then((data) => data.json()).then((urls) => {
        createTable(urls);
      });
    })
    .catch((err) => err.massege);
};
