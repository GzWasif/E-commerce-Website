const useFetchUpdate = (url, data) => {
  const axios = require("axios");

  axios.put(url, data);
};

export { useFetchUpdate };
