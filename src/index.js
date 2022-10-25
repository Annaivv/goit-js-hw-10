import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './css/styles.css';
import { fetchCountries } from '../src/fetchCountries';

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
      .then(countries => {
        if (countries.length === 1) {
          return createCountryMarkup(countries);
        } else if (countries.length >= 2 && countries.length <= 10) {
          return createCountriesList(countries);
        } else {
          Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        }
      })
      .catch(error => console.log(error));
  }
  refs.info.innerHTML = '';
  refs.list.innerHTML = '';
}

function createCountryMarkup(country) {
  const markup = `<h2><img src="${country[0].flags.svg}" alt="${
    country[0].name.common
  }" width="30" height="20"/><span>${country[0].name.official}</span></h2>
        <p><span class="bold">Capital: </span>${country[0].capital[0]}</p>
        <p><span class="bold">Population: </span>${country[0].population}</p>
        <p><span class="bold">Languages: </span>${Object.values(
          country[0].languages
        )}</p>`;
  if (refs.input.value.trim().length === 0) {
    refs.info.innerHTML = '';
  } else {
    refs.info.innerHTML = markup;
  }
}

function createCountriesList(countries) {
  const listMarkup = countries
    .map(item => {
      return `<li><span><img class="flag-img" src="${item.flags.svg}" alt="${item.name.common}" width="30" height="20"/></span>${item.name.official}</li>`;
    })
    .join('');
  refs.list.innerHTML = listMarkup;
}
