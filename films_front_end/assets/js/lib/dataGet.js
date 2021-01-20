import Films from '../components/filmCard';
import dataAccess from '../lib/dataAccess';
const dataGet = async (link) => {
  const data = await dataAccess.api.get(link);
  console.log(typeof data);
  let filmString = '';
  if (data == '[]') {
    document.querySelector('#c-films').innerHTML = '<div class="c-app-empty">Geen films gevonden</div>';
  } else {
    console.log(data);
    for (const film of data) {
      const b = new Films(film);

      filmString += b.render();
    }
    document.querySelector('#c-films').innerHTML = filmString;
  }
};

export default dataGet;
