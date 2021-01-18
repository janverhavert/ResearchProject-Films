import UserReviews from '../components/userReviews';
import dataAccess from '../lib/dataAccess';
const profiel = async () => {
  let urlReviews = `user/reviews/${localStorage.getItem('UserId')}`;
  const data = await dataAccess.api.get(urlReviews);
  console.log(data);
  let reviewsString = '';
  for (const review of data) {
    let filmId = review.FilmId;
    let api = `Film/${filmId}`;
    const data = await dataAccess.api.get(api);
    console.log(data);
    review['filmTitel'] = data.titel;
    const b = new UserReviews(review);
    reviewsString += b.render();
  }
  if (!reviewsString == '') {
    document.querySelector('#c-reviews').innerHTML = reviewsString;
  } else {
    document.querySelector('c-films').innerHTML = 'geen films gevonden';
  }
};

export default profiel;
