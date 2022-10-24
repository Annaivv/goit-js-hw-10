import debounce from 'lodash.debounce';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const baseURL = 'https://restcountries.com/v3.1/';

const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  info: document.querySelector('.country-info'),
};

fetchCountries(Sweden)
  .then(country => console.log(country))
  .catch(error => console.log(error));

function fetchCountries(name) {
  return fetch(`${baseURL}/name/${name}`).then(response => {
    if (!response.ok) {
      throw new Error(response.statuss);
    }
    return response.json();
  });
}
