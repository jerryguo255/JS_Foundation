// import
import {
  addToCart,
  totalPrice as price,
  totalQuentity,
} from "./shoppingCart.js";

// //import all exported things
import * as ShoppingCart from "./shoppingCart.js";

import cloneDeep from "./node_modules/lodash-es/cloneDeep.js";

// import cloneDeep from "lodash-es";

//  import default
//  import add from "./shoppingCart.js";

// console.log("Importing module");
// console.log(ShoppingCart);
// ShoppingCart.addToCart("bread", 5);
// price.toFixed();
// console.log(ShoppingCart.totalPrice);

ShoppingCart.addToCart("juice", 5);
ShoppingCart.addToCart("banana", 5);
ShoppingCart.addToCart("pizza", 5);

console.log(ShoppingCart.cart);

let objA = {
  cart: [
    { product: "bread", quantity: 5 },
    { product: "pizza", quantity: 3 },
  ],
  user: { loggedIn: true },
  age: 22,
};

//let objB = Object.assign({}, objA); // copy A to B
let objB = cloneDeep(objA);
console.log(objB);
// console.log(objA, objA.user.loggedIn); //22 true
// objA.user.loggedIn = false;
// objA.age = 23;

// console.log(objB, objB.user.loggedIn); //22 true
// console.log(objA, objA.user.loggedIn); //23 false

// if (module.hot) {
//   module.hot.accept();
// }

// const state1 = {
//   cart: "5",
// };

// console.log(state1);
// state1.cart = 6;
// console.log(state1);
