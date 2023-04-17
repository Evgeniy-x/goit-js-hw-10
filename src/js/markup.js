export { countryMarkup, countriesMarkup };

function countryMarkup({
  name,
  capital,
  population,
  flags,
  languages: languagesCodes,
}) {
  const listLanguages = Object.values(languagesCodes).join(', ');

  return `<li class="target-country">
      <div class="country-wrapper">
        <img class="icon" src='${flags.png}'>
        <p class="country-name">${name.common}</p>
      </div>
      <ul class="info-list">
        <li class="info-item">Capital: <span>${capital.join('')}</span></li>
        <li class="info-item">Population: <span>${population}</span></li>
        <li class="info-item">Languages: <span>${listLanguages}</span></li>
      </ul>
    </li>`;
}

function countriesMarkup(countriesList) {
  return countriesList
    .map(
      ({ name, flags }) =>
        `<li class="country-wrapper country-target">
          <img class="icon" src='${flags.png}'>
          <p class="country-name">${name.common}</p>
        </li>`
    )
    .join('');
}
