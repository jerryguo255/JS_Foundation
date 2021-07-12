//Exporting module
console.log("Exporting module");

const shippingCost = 10;
export const cart = [];

export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
};

const totalPrice = 222;
const totalQuentity = 23;

//export
export { totalPrice, totalQuentity };

//export default
export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
}
