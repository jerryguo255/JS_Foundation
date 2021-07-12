// // import
// import {
//   addToCart,
//   totalPrice as price,
//   totalQuentity,
// } from "./shoppingCart.js";

// //import all exported things
// import shoppingCart, * as ShoppingCart from "./shoppingCart.js";

// // import default
// // import add from "./shoppingCart.js";

// console.log("Importing module");
// console.log(ShoppingCart);
// ShoppingCart.addToCart("bread", 5);
// price.toFixed();
// console.log(ShoppingCart.totalPrice);

// import add from "./shoppingCart.js";

// add("juice", 5);
// add("banana", 5);
// add("pizza", 5);

// console.log(ShoppingCart.cart);

import cloneDeep from "./node_modules/lodash-es/cloneDeep.js";

const objA = {
  cart: [
    { product: "bread", quantity: 5 },
    { product: "pizza", quantity: 3 },
  ],
  user: { loggedIn: true },
  age: 22,
};

//const objB = Object.assign({}, objA); // copy A to B
const objB = cloneDeep(objA);
console.log(objA, objA.user.loggedIn); //22 true
objA.user.loggedIn = false;
objA.age = 23;

console.log(objB, objB.user.loggedIn); //22 true
console.log(objA, objA.user.loggedIn); //23 false

// const state1 = {
//   cart: "5",
// };

// console.log(state1);
// state1.cart = 6;
// console.log(state1);
