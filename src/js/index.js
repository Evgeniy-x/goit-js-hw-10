import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';

import '../css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import { countryMarkup, countriesMarkup } from './markup';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  listCountry: document.querySelector('.country-list'),
  infoCountry: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
  const searchData = e.target.value.trim();

  if (!searchData) {
    refs.listCountry.innerHTML = '';
    return;
  }

  fetchCountries(searchData).then(findCountries).catch(onFetchError);
}

function findCountries(coutriesArr) {
  if (coutriesArr.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
    refs.listCountry.innerHTML = '';
    return;
  }

  if (coutriesArr.length === 1) {
    refs.listCountry.innerHTML = countryMarkup(coutriesArr[0]);
  } else {
    refs.listCountry.innerHTML = countriesMarkup(coutriesArr);
  }
}

function onFetchError() {
  Notify.failure('Oops, there is no country with that name');
}
