import debounce from 'lodash.debounce';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const baseURL = 'https://restcountries.com/v3.1/';

const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  info: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
  const inputValue = refs.input.value.trim();
  if (inputValue.length !== 0) {
    fetchCountries(inputValue)
      .then(createMarkup)
      .catch(error => console.log(error));
  }
}

function fetchCountries(name) {
  return fetch(`${baseURL}/name/${name}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

function createMarkup(country) {
  const markup = `<h2><img src="${country[0].flags.svg}" alt="${
    country[0].name.common
  }" />${country[0].name.official}</h2>
        <p><span>Capital: </span>${country[0].capital[0]}</p>
        <p><span>Population: </span>${country[0].population}</p>
        <p><span>Languages: </span>${Object.values(country[0].languages)}</p>`;
  refs.info.innerHTML = markup;
}
