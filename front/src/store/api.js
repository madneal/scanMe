import axios from 'axios';
const host = 'http://localhost:3000/';

const store = {};

export default store;

store.fetch = (query) => {
  const target = url + '?' + query;
  return axios.get(target)
    .then((response) => {
      const result = response.data;
      return data;
    })
    .catch((err) => {
      console.error(err);
    })
}