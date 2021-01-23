import UserReviews from '../components/userReviews';
import dataAccess from '../lib/dataAccess';
const profiel = async () => {
  let urlReviews = `user/reviews/${localStorage.getItem('UserId')}`;
  const data = await dataAccess.api.get(urlReviews);
  let reviewsString = '';
  if (data == null) {
    document.querySelector('#c-reviews').innerHTML = '<div class="c-app-empty">Nog geen reviews toegevoegd</div>';
  } else {
    for (const review of data) {
      let filmId = review.filmId;
      let api = `Film/${filmId}`;
      const data = await dataAccess.api.get(api);
      review['filmTitel'] = data.titel;
      review['posterUrl'] = data.posterUrl;
      const b = new UserReviews(review);
      reviewsString += b.render();
    }
    document.querySelector('#c-reviews').innerHTML = reviewsString;
  }
};

export default profiel;
