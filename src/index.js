import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries.js';
console.log('fetchCountries', fetchCountries('peru'));

const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener(
  'input',
  debounce(e => {
    const inputValue = input.value.trim();
    if (inputValue !== '') {
      fetchCountries(inputValue).then(data => {
        if (data.length > 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else if (data.length === 0) {
          Notiflix.Notify.failure('Oops, there is no country with that name');
        } else if (data.length >= 2 && data.length <= 10) {
          renderCountryList(data);
        } else if (data.length === 1) {
          renderOneCountryList(data);
        }
      });
    }
  }, DEBOUNCE_DELAY)
);

function renderCountryList(countries) {
  const markup = countries
    .map(country => {
      return `<li>
      <img src="${country.flags.svg}" alt="Flag of ${country.name.official}" width="30" hight="20">
         <p>${country.name}</p>
         </li>`;
    })
    .join('');
  countryList.innerHTML = markup;
}

function renderOneCountryList(countries) {
  const markup = countries
    .map(country => {
      return `<li>
      <img src="${country.flags.svg}" alt="Flag of ${
        country.name.official
      }" width="30" hight="20">
         <p><b>${country.name}<b></p>
         <p><b>Capital</b>: ${country.capital}</p>
         <p><b>Population</b>: ${country.population}</p>
         <p><b>Languages</b>: ${Object.values(country.languages)} </p>
         </li>`;
    })
    .join('');
  countryList.innerHTML = markup;
}
