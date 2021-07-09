'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////

const getCountryData = function (country) {
  // fetch the country return a response
  getJsonHelper(`https://restcountries.eu/rest/v2/name/${country}`)
    // get the data,
    .then(data => {
      //use it to render conuntry
      renderCountry(data[0]);
      // check the country if has a neighbour
      const neighbour = data[0].borders[0];
      //if the country dose not have neighbour
      if (!neighbour) throw new Error("This country does't have neighbour");
      //fetch the neighbour country , return a response
      return getJsonHelper(
        `https://restcountries.eu/rest/v2/alpha/${neighbour}`,
        `Country not found!`
      );
    })
    //handle response

    //handle data
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.log(`${err} `);
      renderError(`${err}. `);
    })
    //only works on promise, so the catch will also return a promise no matter it perform or not
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};
//getCountryData('uk');
btn.addEventListener('click', () => {
  whereAmI('51.50354', '-0.12768');
});

const getJsonHelper = function (url, ErrMessage = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok)
      throw new Error(`Error ${response.status} : ${ErrMessage}`);
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

const whereAmI = function (lat, lng) {
  //reverse geocoding , convert coordinates to a meaningful location,
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(response => {
      if (!response.ok)
        throw new Error(`Error ${response.status} :get data too fast`);
      return response.json();
    })
    .then(data => {
      console.log(`You are in ${data.city} ${data.country}`);
      return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`Error ${res.status}`);
      return res.json();
    })
    .then(data => {
      renderCountry(data[0]);
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};
/////////////////////////////

// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/
