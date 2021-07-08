'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////class

const getCountryData = function (country) {
  // fetch the country return a response
  getJsonHelper(`https://restcountries.eu/rest/v2/name/${country}`)
    // get the data,
    .then(data => {
      //use it to render conuntry
      renderCountry(data[0]);
      // check the country if has a neighbour
      const neighbour = data[0].borders[0];
      if (!neighbour) return;

      //fetch the neighbour country , return a response
      return getJsonHelper(
        `https://restcountries.eu/rest/v2/alpha/${neighbour}`
      );
    })
    //handle response

    //handle data
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.log(`${err} `);
      renderError(`Something went wrong : ${err.message}. `);
    })
    //only works on promise, so the catch will also return a promise no matter it perform or not
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};
//getCountryData('uk');
btn.addEventListener('click', () => {
  getCountryData('uk');
});

const getJsonHelper = function (url, ErrMessage) {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`Error ${response.status} `);
    return response.json();
  });
};

const renderError = function (message) {
  countriesContainer.insertAdjacentText('beforeend', message);
};

const renderCountry = function (country, className = '') {
  const html = `
    <article class="country ${className}">
      <img class="country__img" src="${country.flag}" />
      <div class="country__data">
        <h3 class="country__name">${country.name}</h3>
        <h4 class="country__region">${country.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +country.population / 1000000
        ).toFixed(1)}m people</p>
        <p class="country__row"><span>🗣️</span>${country.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${country.currencies[0].name}</p>
      </div> 
    `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
};
