import Films from '../components/filmCard';
import dataAccess from '../lib/dataAccess';
const dataFilmCard = async (type) => {
  let url = type;

  const data = await dataAccess.api.get(url);
  console.log(data);
  let filmString = '';
  for (const genre of data) {
    const b = new Films(genre);
    filmString += b.render();
  }
  if (!filmString == '') {
    document.querySelector('#c-films').innerHTML = filmString;
  } else {
    document.querySelector('c-films').innerHTML = 'geen films gevonden';
  }
};

export default dataFilmCard;
