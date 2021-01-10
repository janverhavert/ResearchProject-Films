const api = (function () {
  const get = (endpoint) => {
    return fetch('https://localhost:44313/api/' + endpoint).then((resp) => resp.json());
  };
  return {
    get: get,
  };
})();

const dataAccess = {};

dataAccess.api = api;
export default dataAccess;
