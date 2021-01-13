async function postData() {
  var username = document.getElementById('UserName').value;
  var Password = document.getElementById('Password').value;

  // Default options are marked with *
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append(
    'Cookie',
    '.AspNetCore.Identity.Application=CfDJ8D-8YdoiRIlArtTCfwZ0lkv9wshkXE7FKhyogkhvZSAT7Ey3lLz6lGF-YyK34wI6j4kVAUOFePVLj9iFSMVAFYA-bXJQDLVN6EU8ShaumsEzEucaD7Z6rym886iRV6V1gDy97Xg0fmzTJWAZi8RCK65eMKz-tfqC5ic9Dob7oine58WjMjOX-a_lMMZ8R5dthvZIWVazDZocuoEQacslLzrMP3OKHkEdL3NZjqVMKnklrNt3LEhsa5oEp74dewW4UQPoHj-td9e0URFGwEKw2PsQM7NB2L0qwBzYHnbBqIUi6wbE7sifmWo_49pIoC_W8l3HOgOc4OmcHJASDnX1dmXKKEuUMemjesweDvOKZPCY6UqjLt5CZY-6HC3IuhEb4fIvPtMe1Aj2rIa6ZXvgYogLNZHbmts9M2uB1PZ4I7kWfVdLiRvF8lr8ig8TsF_EmzZg8lMY49gQLlke3h4PDdnfyB3CR1I7laFgfszfBQ1hubUYfToDcgtqzLLeqOGLoYhIUCh3luWdmB9Cvs-YJ0LvUqid8w58AhuSBfTPDVYzNj0fYtH0KM0nJVx_7_WG3ThcB6HHvK6qpje2Nvchuwx1iy6RfUO1Lek4NKavzxBKVNjMR4guz_4m3b_RGjUNzdTtvh_tVqmO2guOncXj4LZdn4EW8C-E-A-I00_TUCVF_z2rvs7npg5dedV6Ws2VY9jq484UutVY3T-Sr157JUm1jUo6YCTLy8XZp2rqLJqojZoD5CxqTmrQV6E6zI9LMWQeyX9KHsd2IAXCQuXV24SyNkfMaDCg4ZQv1IUIMLtxIUsDKoayDZWqQkBMKhLGZjJA-3u6WPnwk82zaqMwltBz9sxNLLkQpqjaw4z0o6f2'
  );
  var formData = JSON.stringify({ UserName: username, Password: Password });
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formData,
    redirect: 'follow',
  };

  fetch('http://localhost:63436/api/auth/login', requestOptions)
    .then((response) => response.text())
    .then((result) => getLoginID(result, username))
    .catch((error) => errorDisplay(error));
}

const errorDisplay = (error) => {
  const input = document.querySelectorAll('input').forEach((a) => a.classList.add('is-invalid'));
  //const feedback = document.getElementsByClassName('c-login-feedback');
  document.querySelectorAll('.c-login-feedback').forEach((a) => (a.style.display = 'initial'));
  //feedback.style.display = 'initial';
  input;
};

const getLoginID = (json, username) => {
  var jsonresult = JSON.parse(json);
  console.log(username);

  fetch(`http://localhost:63436/api/auth/LoginData/?name=${username}&token=${jsonresult.token}`)
    .then((response) => response.text())
    .then((result) => getUserData(JSON.parse(result)))
    .catch((error) => console.log('error', error));
};

const getUserData = (userId) => {
  console.log(userId);
  var url = `http://localhost:63436/api/auth/UserData/?UserId=${userId}`;
  console.log(url);
  fetch(url)
    .then((response) => response.text())
    .then((result) => inloggen(result))
    .catch((error) => console.log('error', error));
};

const inloggen = (userData) => {
  var user = JSON.parse(userData);
  console.log(user);
  var userId = user.user.id;
  var userName = user.user.userName;
  var userRole = user.assignedRoles[0];
  localStorage.setItem('UserId', userId);
  localStorage.setItem('UserRole', userRole);
  localStorage.setItem('UserName', userName);
  window.location.href = '/';
};

export default postData;
