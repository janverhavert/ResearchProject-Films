const api = (function () {
  const get = (endpoint) => {
    return fetch(endpoint).then((resp) => resp.json());
  };
  return {
    get: get,
  };
})();

const dataAccess = {};

dataAccess.api = api;
export default dataAccess;
