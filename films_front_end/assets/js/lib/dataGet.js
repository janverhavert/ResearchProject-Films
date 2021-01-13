import Films from '../components/filmCard';
import dataAccess from '../lib/dataAccess';
const dataGet = async (link) => {
  const data = await dataAccess.api.get(link);
  console.log(data);
  let filmString = '';
  for (const film of data) {
    const b = new Films(film);
    filmString += b.render();
  }
  if (!filmString == []) {
    document.querySelector('#c-films').innerHTML = filmString;
  } else {
    document.querySelector('#c-films').innerHTML = 'geen film gevonden';
  }
};
export default dataGet;
