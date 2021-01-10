import Film from '../components/filmDetail';
import Reviews from '../components/reviewsFilm';
import dataAccess from '../lib/dataAccess';
const dataFilmDetail = async () => {
  var url = window.location.pathname;
  var id = url.substring(url.lastIndexOf('/') + 1);
  let api = `film/${id}`;
  let apiReviews = `films/Reviews/${id}`;

  const data = await dataAccess.api.get(api);
  const dataReviews = await dataAccess.api.get(apiReviews);
  console.log(data);
  var sum = 0;
  for (var i = 0; i < dataReviews.length; i++) {
    (sum += dataReviews[i].score), 10; //don't forget to add the base
  }
  var avg = sum / dataReviews.length;

  let filmString = '';
  data['avg'] = avg;
  data['reviews'] = dataReviews;
  const b = new Film(data);

  filmString += b.render();
  if (!filmString == '') {
    document.querySelector('#c-film').innerHTML = filmString;
  } else {
    document.querySelector('#c-film').innerHTML = 'geen films gevonden';
  }

  let reviewString = '';
  for (const review of dataReviews) {
    const b = new Reviews(review);
    reviewString += b.render();
  }
  if (!reviewString == '') {
    document.querySelector('#c-reviews').innerHTML = reviewString;
  } else {
    document.querySelector('#c-reviews').innerHTML = 'Wees de eerste';
  }
};

export default dataFilmDetail;
