'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const getCountryData = function (country) {
  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(function (response) {
      return response.json();
    })
    .then(function ([data]) {
      renderCountry(data);
      console.log(data);
    });
};

getCountryData('China');

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
  countriesContainer.insertAdjacentHTML('afterBegin', html);
  countriesContainer.style.opacity = 1;
};
