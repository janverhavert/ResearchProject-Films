import filmDetail from '../components/filmDetail';
import reviewForm from '../components/reviewForm';
import Reviews from '../components/reviewsFilm';
import dataAccess from '../lib/dataAccess';
const dataFilmDetail = async () => {
  var url = window.location.pathname;
  var id = url.substring(url.lastIndexOf('/') + 1);
  let api = `Film/${id}`;
  let apiReviews = `films/Reviews/${id}`;

  let apiWatched = `Watched/${localStorage.getItem('UserId')}`;
  const data = await dataAccess.api.get(api);
  console.log(data);
  const dataReviews = await dataAccess.api.get(apiReviews);
  console.log(dataReviews);
  if (localStorage.getItem('UserId')) {
    const dataWatched = await dataAccess.api.get(apiWatched);
    console.log(dataWatched);
    document.querySelector('#c-review-form').innerHTML = reviewForm();
    data['watched'] = false;
    for (const watchedlist of dataWatched) {
      if (watchedlist.filmId == id) {
        data['watched'] = true;
        break;
      }
    }
  }

  var sum = 0;
  for (var i = 0; i < dataReviews.length; i++) {
    console.log(dataReviews[i].score);
    (sum += dataReviews[i].score), 10; //don't forget to add the base
  }
  var avg = sum / dataReviews.length;
  data['avg'] = Math.round(avg * 10) / 10;
  data['reviews'] = dataReviews;

  filmDetail(data);
  getReviews();
  const button = document.querySelector('.js-watched');
  console.log(button.id);
  button.onclick = function () {
    console.log('click');
    Watched.call(this, data.filmId, button);
  };
  const buttonReview = document.querySelector('.js-review');
  console.log(buttonReview);
  buttonReview.onclick = function () {
    console.log('click');
    Review.call(this, data.filmId, localStorage.getItem('UserId'));
  };
};

const getReviews = async () => {
  var url = window.location.pathname;
  var id = url.substring(url.lastIndexOf('/') + 1);
  let apiReviews = `films/Reviews/${id}`;
  const dataReviews = await dataAccess.api.get(apiReviews);

  let reviewString = '';
  for (const review of dataReviews) {
    const b = new Reviews(review);
    reviewString += b.render();
  }
  if (!reviewString == []) {
    document.querySelector('#c-reviews').innerHTML = reviewString;
  } else {
    document.querySelector('.js-eerste').innerHTML = 'Wees de eerste';
  }
};

const Review = (filmId, UserId) => {
  const titel = document.querySelector('#titel').value;
  console.log(titel);
  const score = document.querySelector('#score').value;
  const discription = document.querySelector('#discription').value;
  const userName = localStorage.getItem('UserName');

  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append(
    'Cookie',
    '.AspNetCore.Identity.Application=CfDJ8D-8YdoiRIlArtTCfwZ0lkv9wshkXE7FKhyogkhvZSAT7Ey3lLz6lGF-YyK34wI6j4kVAUOFePVLj9iFSMVAFYA-bXJQDLVN6EU8ShaumsEzEucaD7Z6rym886iRV6V1gDy97Xg0fmzTJWAZi8RCK65eMKz-tfqC5ic9Dob7oine58WjMjOX-a_lMMZ8R5dthvZIWVazDZocuoEQacslLzrMP3OKHkEdL3NZjqVMKnklrNt3LEhsa5oEp74dewW4UQPoHj-td9e0URFGwEKw2PsQM7NB2L0qwBzYHnbBqIUi6wbE7sifmWo_49pIoC_W8l3HOgOc4OmcHJASDnX1dmXKKEuUMemjesweDvOKZPCY6UqjLt5CZY-6HC3IuhEb4fIvPtMe1Aj2rIa6ZXvgYogLNZHbmts9M2uB1PZ4I7kWfVdLiRvF8lr8ig8TsF_EmzZg8lMY49gQLlke3h4PDdnfyB3CR1I7laFgfszfBQ1hubUYfToDcgtqzLLeqOGLoYhIUCh3luWdmB9Cvs-YJ0LvUqid8w58AhuSBfTPDVYzNj0fYtH0KM0nJVx_7_WG3ThcB6HHvK6qpje2Nvchuwx1iy6RfUO1Lek4NKavzxBKVNjMR4guz_4m3b_RGjUNzdTtvh_tVqmO2guOncXj4LZdn4EW8C-E-A-I00_TUCVF_z2rvs7npg5dedV6Ws2VY9jq484UutVY3T-Sr157JUm1jUo6YCTLy8XZp2rqLJqojZoD5CxqTmrQV6E6zI9LMWQeyX9KHsd2IAXCQuXV24SyNkfMaDCg4ZQv1IUIMLtxIUsDKoayDZWqQkBMKhLGZjJA-3u6WPnwk82zaqMwltBz9sxNLLkQpqjaw4z0o6f2'
  );
  var formData = JSON.stringify({ titel: titel, score: parseFloat(score), userName: userName, discription: discription, userId: UserId, filmId: filmId });
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formData,
    redirect: 'follow',
  };

  fetch(`http://127.0.0.1:3000/api/User/Reviews`, requestOptions)
    .then((response) => response.text())
    .then((result) => getReviews())
    .catch((error) => console.log(error));
};

const Watched = (id, button) => {
  if (button.id == 'Watched') {
    fetch(`https://localhost:44313/api/Watched/${localStorage.getItem('UserId')}`, {
      method: 'DELETE',
    }).then((response) => (button.id = 'notWatched') && (button.innerHTML = 'Not watched'));
  } else if (button.id == 'notWatched') {
    console.log('click2');
    WatchedPost(button, id);
  }
};

const WatchedPost = (button, id) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append(
    'Cookie',
    '.AspNetCore.Identity.Application=CfDJ8D-8YdoiRIlArtTCfwZ0lkv9wshkXE7FKhyogkhvZSAT7Ey3lLz6lGF-YyK34wI6j4kVAUOFePVLj9iFSMVAFYA-bXJQDLVN6EU8ShaumsEzEucaD7Z6rym886iRV6V1gDy97Xg0fmzTJWAZi8RCK65eMKz-tfqC5ic9Dob7oine58WjMjOX-a_lMMZ8R5dthvZIWVazDZocuoEQacslLzrMP3OKHkEdL3NZjqVMKnklrNt3LEhsa5oEp74dewW4UQPoHj-td9e0URFGwEKw2PsQM7NB2L0qwBzYHnbBqIUi6wbE7sifmWo_49pIoC_W8l3HOgOc4OmcHJASDnX1dmXKKEuUMemjesweDvOKZPCY6UqjLt5CZY-6HC3IuhEb4fIvPtMe1Aj2rIa6ZXvgYogLNZHbmts9M2uB1PZ4I7kWfVdLiRvF8lr8ig8TsF_EmzZg8lMY49gQLlke3h4PDdnfyB3CR1I7laFgfszfBQ1hubUYfToDcgtqzLLeqOGLoYhIUCh3luWdmB9Cvs-YJ0LvUqid8w58AhuSBfTPDVYzNj0fYtH0KM0nJVx_7_WG3ThcB6HHvK6qpje2Nvchuwx1iy6RfUO1Lek4NKavzxBKVNjMR4guz_4m3b_RGjUNzdTtvh_tVqmO2guOncXj4LZdn4EW8C-E-A-I00_TUCVF_z2rvs7npg5dedV6Ws2VY9jq484UutVY3T-Sr157JUm1jUo6YCTLy8XZp2rqLJqojZoD5CxqTmrQV6E6zI9LMWQeyX9KHsd2IAXCQuXV24SyNkfMaDCg4ZQv1IUIMLtxIUsDKoayDZWqQkBMKhLGZjJA-3u6WPnwk82zaqMwltBz9sxNLLkQpqjaw4z0o6f2'
  );
  var formData = JSON.stringify({ UserId: localStorage.getItem('UserId'), FilmId: id });
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formData,
    redirect: 'follow',
  };

  fetch(`https://localhost:44313/api/Watched`, requestOptions)
    .then((response) => response.text())
    .then((result) => (button.id = 'watched') && (button.innerHTML = 'watched'))
    .catch((error) => console.log(error));
};

export default dataFilmDetail;
