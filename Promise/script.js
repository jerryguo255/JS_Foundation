'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(
      // position => resolve(position),
      resolve,
      // err => reject(err)
      reject
    );
  });
};

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

const whereAmI = function () {
  getPosition()
    .then(positon => {
      const { latitude: lat, longitude: lng } = positon.coords;
      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })
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
  //reverse geocoding , convert coordinates to a meaningful location,
};
//getCountryData('uk');
btn.addEventListener('click', whereAmI);
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

//#region **test event loop**

//top of call stack
// console.log('Test start');

// //regist in web api enviornment，when fire off， add to callback queue
// setTimeout(() => console.log('0 sec timer'), 0);

// //regist in web api enviornment，when fire off， add to MICROTASK queue
// Promise.resolve('Resolved promise 1').then(res => console.log(res));
// Promise.resolve('Resolved promise 2').then(res => {
//   for (let i = 0; i < 50; i++) {
//     console.log('i');
//   }
//   console.log(res);
// });

// //secondry of call stack
// console.log('Test end');

//#endregion

//#region  **encapsulate an asynchronous behavior into a promise**

// const lotteryPromise = new Promise(function (resove, reject) {
//   //executor
//   console.log('Lotter draw is happenning...');
//   setTimeout(() => {
//     if (Math.random() >= 0.5) {
//       resove('You Win');
//     } else {
//       reject(new Error('You lost 2your money'));
//     }
//   }, 500);
// });

// lotteryPromise.then(
//   response => console.log(response),
//   err => console.log(err)
// );
//#endregion

//#region **Promisifying setTimeout**

// const wait = function (milliseconds) {
//   return new Promise(resolve => {
//     setTimeout(resolve, milliseconds, milliseconds);
//   });
// };

// wait(1000)
//   .then(resc => {
//     console.log(`${resc / 1000}s passed.`);
//     return wait(resc * 3);
//   })
//   .then(r => console.log(`${r / 1000}s passed.`));

//1s passed.
//3s passed.

//callback hell
// setTimeout(() => {
//   console.log('1s passed');
//   setTimeout(() => {
//     console.log('2s passed');
//   }, 1000);
// }, 1000);

//#endregion

// //#region  **simple promise**
// const getDataAsyc = function (value) {
//   return new Promise((resolve, reject) => {
//     resolve(value);
//     reject(value); //
//   });
// };

// getDataAsyc(22).then(
//   res => console.log(res),
//   err => {
//     throw new Error(`reject : ${err}`);
//   }
// );
// //output: 22;

// Promise.resolve('resolve').then(x => console.log(x));
// Promise.reject('reject').then(x => console.Error(x));

//#endregion
// navigator.geolocation.getCurrentPosition(
//   position => console.log(position),
//   err => console.log(err)
// );
// console.log('this line first');

///////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input.
 This function returns a promise which creates a new image (use document.createElement('img')) 
 sets the .src attribute to the provided image path.

  //When the image is done loading, append it to the DOM element with the 'images' class,
  //and resolve the promise.

   The fulfilled value should be the image element itself.
    In case there is an error loading the image ('error' event), reject the promise.
*/

// createImage('https://i.loli.net/2021/07/10/ExX6WfeY2uNcR3v.png').then(dom => {
//   countriesContainer.appendChild(dom);
// });

// const createImageT = function (imgpath) {
//   const dom = document.createElement('img');
//   dom.src = imgpath;
//   dom.width = 55;
//   dom.alt = 'asdasd';
//   btn.appendChild(dom);
// };
// createImageT('https://i.loli.net/2021/07/10/ty3u9ZogDH72d8F.png');

const imgContainer = document.querySelector('.images');

// with two arguments
const createImage = function (imgPath, waitSec) {
  return new Promise(function (resolve, reject) {
    const dom = document.createElement('img');
    // console.log('loading start');
    dom.src = imgPath;

    dom.addEventListener('load', function () {
      imgContainer.append(dom);
      resolve([dom, waitSec]);
    });
    dom.addEventListener('error', function () {
      reject(new Error('connot load'));
    });
  });
};
const wait = function (sec, args) {
  return new Promise(resolve => {
    setTimeout(() => resolve([sec, args]), sec * 1000);
  });
};

//create  image-1 with wait time,
createImage('./img/img-1.jpg', 1.5)
  .then(arr => {
    const [imgElement, waitSec] = arr;
    //output with sec and img file name
    console.log(
      `After ${waitSec} secs Image:${imgElement.src.slice(
        imgElement.src.indexOf('/img/') + 5
      )} will be hidden`
    );
    return wait(waitSec, imgElement);
  })
  //wait x sec  hide
  .then(arr => {
    const [sec, imgElement] = arr;
    imgElement.style.visibility = 'hidden';
    console.log(`${sec} sec passed and image hided`);
    return wait(sec, imgElement);
  })
  .then(arr => {
    const [sec, imgElement] = arr;
    imgElement.src = './img/img-2.jpg';
    imgElement.style.visibility = 'visible';
    console.log(`${sec} sec passed and image shows`);
    return wait(sec, imgElement);
  })
  .then(arr => {
    const [sec, imgElement] = arr;
    imgElement.style.visibility = 'hidden';
    console.log(`${sec} sec passed and image hided`);
  })
  .catch(err => console.error(err));

/*
If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;

4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/
