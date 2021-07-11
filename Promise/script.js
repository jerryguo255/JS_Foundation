'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const imgContainer = document.querySelector('.images');

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
  countriesContainer.style.opacity = 1;
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

//#region  Coding Challenge #1

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
//#endregion

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

//#region  **simple promise**
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

// //#region  Coding Challenge #2

// /*
// Build the image loading functionality that I just showed you on the screen.

// Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

// PART 1
// 1. Create a function 'createImage' which receives imgPath as an input.
//  This function returns a promise which creates a new image (use document.createElement('img'))
//  sets the .src attribute to the provided image path.

//   //When the image is done loading, append it to the DOM element with the 'images' class,
//   //and resolve the promise.

//    The fulfilled value should be the image element itself.
//     In case there is an error loading the image ('error' event), reject the promise.
// */

// // createImage('https://i.loli.net/2021/07/10/ExX6WfeY2uNcR3v.png').then(dom => {
// //   countriesContainer.appendChild(dom);
// // });

// // const createImageT = function (imgpath) {
// //   const dom = document.createElement('img');
// //   dom.src = imgpath;
// //   dom.width = 55;
// //   dom.alt = 'asdasd';
// //   btn.appendChild(dom);
// // };
// // createImageT('https://i.loli.net/2021/07/10/ty3u9ZogDH72d8F.png');

// // with two arguments
// const createImage = function (imgPath, waitSec) {
//   return new Promise(function (resolve, reject) {
//     const dom = document.createElement('img');
//     // console.log('loading start');
//     dom.src = imgPath;

//     dom.addEventListener('load', function () {
//       imgContainer.append(dom);
//       resolve([dom, waitSec]);
//     });
//     dom.addEventListener('error', function () {
//       reject(new Error('connot load'));
//     });
//   });
// };
// const wait = function (sec, args) {
//   return new Promise(resolve => {
//     setTimeout(() => resolve([sec, args]), sec * 1000);
//   });
// };

// //create  image-1 with wait time,
// createImage('./img/img-1.jpg', 1.5)
//   .then(arr => {
//     const [imgElement, waitSec] = arr;
//     //output with sec and img file name
//     console.log(
//       `After ${waitSec} secs Image:${imgElement.src.slice(
//         imgElement.src.indexOf('/img/') + 5
//       )} will be hidden`
//     );
//     return wait(waitSec, imgElement);
//   })
//   //wait x sec  hide
//   .then(arr => {
//     const [sec, imgElement] = arr;
//     imgElement.style.visibility = 'hidden';
//     console.log(`${sec} sec passed and image hided`);
//     return wait(sec, imgElement);
//   })
//   .then(arr => {
//     const [sec, imgElement] = arr;
//     imgElement.src = './img/img-2.jpg';
//     imgElement.style.visibility = 'visible';
//     console.log(`${sec} sec passed and image shows`);
//     return wait(sec, imgElement);
//   })
//   .then(arr => {
//     const [sec, imgElement] = arr;
//     imgElement.style.visibility = 'hidden';
//     console.log(`${sec} sec passed and image hided`);
//   })
//   .catch(err => console.error(err));

// /*
// If this part is too tricky for you, just watch the first part of the solution.

// PART 2
// 2. Comsume the promise using .then and also add an error handler;
// 3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;

// 4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
// 5. After the second image has loaded, pause execution for 2 seconds again;
// 6. After the 2 seconds have passed, hide the current image.

// TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

// GOOD LUCK 😀
// */

// //#endregion

//#region  Rewrite WhereAmI function, change promise chain to async await pattern

// fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`).then(res =>
//   console.log(res)
// );
const showWhereAmI = async function () {
  try {
    //get location from geoAPI and destructure
    const {
      coords: { latitude: lat, longitude: lng },
    } = await getPosition();

    //fetch countryRes
    const geoCountryRes = await fetch(
      `https://geocode.xyz/${lat},${lng}?geoit=json`
    );

    //anything isn‘t 200， throw exception
    if (!geoCountryRes.ok) {
      throw new Error('Error:' + geoCountryRes.status);
    }
    //json it
    const geoCountryName = await geoCountryRes.json();

    const countryDataRes = await fetch(
      `https://restcountries.eu/rest/v2/name/${geoCountryName.country}`
    );
    if (!countryDataRes.ok) throw new Error('Error:' + countryDataRes.status);

    const countryData = await countryDataRes.json();

    renderCountry(countryData[0]);
  } catch (error) {
    throw error;
  }
};

// (async () => {
//   try {
//     const re = await showWhereAmI();

//     console.log(re);
//   } catch (err) {
//     console.log(`${err} emoj`);
//   }
// })();
// first
// after fetch
// Response {...}
//#endregion

//#region  Coding Challenge #3

/* 
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.
*/

const waitNDo = function (sec) {
  return new Promise(resolve => {
    setTimeout(resolve, sec * 1000);
  });
};
//#region  rewrite create img with Pause time

//
// const loadNPause = async function (imgPath01, imgPath02) {
//   try {
//     // create img element and set imgPath01
//     const imgEl = document.createElement('img');
//     imgEl.src = imgPath01;

//     // load img with 2s(simulate bad network)
//     await waitNDo(2);
//     imgEl.addEventListener('load', () => {
//       imgContainer.append(imgEl);
//     });
//     imgEl.addEventListener('error', () => {
//       console.log('img01 load error');
//     });

//     // hide img after 2s
//     await waitNDo(2);
//     imgEl.style.display = 'none';

//     // set imgPath02
//     imgEl.src = imgPath02;

//     // load  img02 after 2s
//     await waitNDo(2);
//     imgEl.style.display = 'block';
//     imgEl.addEventListener('load', () => {
//       console.log(imgEl);
//       imgContainer.append(imgEl);
//     });
//     imgEl.addEventListener('error', () => {
//       console.log('img01 load error');
//     });

//     // hide img02 after 2s
//     await waitNDo(2);
//     imgEl.style.display = 'none';

//     console.log('ss');
//   } catch (err) {
//     console.log(err.message);
//     // throw new Error(`${err.message} + loadnPause Error🐞`);
//   }
// };

// try {
//   loadNPause('./img/img-1.jpg', './img/img-2.jpg');
// } catch (err) {
//   console.log(err);
// }

// (async () => {
//   await waitNDo(2);
//   console.log('ss');
//   await waitNDo(2);
//   console.log('ss');
// })();
//#endregion

const createImageTag = async function (imgPath) {};
/* 
PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'paralell' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

GOOD LUCK 😀
*/
//
//
//

const imgPaths = [
  'https://wiki.eveuniversity.org/images/thumb/7/73/E-UNI.png/300px-E-UNI.png',
  'https://i.ytimg.com/vi_webp/gEOI-Ae_aaU/sddefault.webp',
  'https://hearthstone.nosdn.127.net/3/suspense/logo_blizzard.png',
];

// const createImg = function (imgPath) {
//   //create a img element
//   const img = document.createElement('img');
//   //set src to it
//   img.src = imgPath;

//   //append to imgContainer
//   imgContainer.append(img);

//   //handle error
//   img.addEventListener('error', () => {
//     console.log('Image loading error');
//   });

//   //set class
//   img.classList.add('parallel');
// };

const createImgTag = function (imgPath) {
  return new Promise((resolve, reject) => {
    const imgEl = document.createElement('img');
    imgEl.src = imgPath;
    imgEl.addEventListener('load', () => {
      imgContainer.append(imgEl);
      resolve(imgEl);
    });
    imgEl.addEventListener('error', () => {
      reject('image load error');
    });
  });
};

const loadAll = async function (imgPathArr) {
  try {
    const imgsPromise = imgPathArr.map(async (v, i, _) => {
      return await createImgTag(v);
    });
    const imgs = await Promise.all(imgsPromise);
    imgs.forEach(img => img.classList.add('parallel'));
  } catch (err) {
    console.error(err);
  }
};

loadAll(imgPaths);
//#endregion
