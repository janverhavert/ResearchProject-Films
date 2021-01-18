const api = (function () {
  const get = (endpoint) => {
    return fetch('http://127.0.0.1:3000/api/' + endpoint).then((resp) => resp.json());
  };
  return {
    get: get,
  };
})();

const dataAccess = {};

dataAccess.api = api;
export default dataAccess;
