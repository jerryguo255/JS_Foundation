// var sc = [
//   { product: "bread", quantity: 6 },
//   { product: "pizza", quantity: 2 },
//   { product: "milk", quantity: 4 },
//   { product: "water", quantity: 10 },
// ];

// var allow = {
//   lisbon: 5,
//   others: 7,
// };

// var description = "";

// var check = function (city) {
//   if (sc.length > 0) {
//     var allowed;
//     if (city == "lisbon") {
//       allowed = allow.lisbon;
//     } else {
//       allowed = allow.others;
//     }

//     for (item of sc) {
//       if (item.quantity > allowed) item.quantity = allowed;
//     }
//   }
// };

// const classmates = [
//   { name: "jerry", age: 33 },
//   { name: "jerry2", age: 33 },
//   { name: "jerry3", age: 33 },
//   { name: "jerry4", age: 33 },
// ];

// const addClassmate = (name, age, classmates) => [...classmates, { name, age }];

// addClassmate("jerry5", 22, classmates);
// // check("lisbon");
// // console.log(sc);

/////

// let count = 500; //全局作用域

// const foo1 = function () {
//   let count = 0; //函数全局作用域

//   function foo2() {
//     let count = 1;
//     count++; //函数内部作用域

//     console.log(count);
//     return count;
//   }
//   return foo2; //返回函数
// };
// let result = foo1();
// result(); //结果为1
// result(); //结果为2

// let count = 500; //全局作用域
// function foo1() {
//   let count = 0; //函数全局作用域
//   function foo2() {
//     //let count = 2; //随便新增一个变量
//     count++;
//     //debugger;
//     console.log(count);
//     return count;
//   }
//   return foo2; //返回函数
// }
// let result = foo1();
// result(); //结果为2
// result(); //结果为3

// foo1()();
// foo1()();

// for (let i = 1; i <= 5; i++) {
//   setTimeout(function timer() {
//     // debugger;
//     console.log(i); // 输出什么?
//   }, 0);
// }
/////

// var createDescription = function () {
//   var first = sc[0];
//   var p = first.product;
//   var q = first.quantity;

//   if (sc.length > 1) {
//     description = "Order with " + q + " " + p + ", etc...";
//   } else {
//     description = "Order with " + q + " " + p + ".";
//   }
// };
// createDescription();

// console.log(description);

// //

// const data = [
//   { key: "name", value: "jerry" },
//   { key: "age", value: 1 },
//   { key: "from", value: "数据平台" },
// ];

// const processFn = (data) => {
//   //Object.freeze(data);
//   //  data.map(([...data]) => console.log(data));
//   const obj = {};
//   data.map((arr) => {
//     obj[arr.key] = arr.value;
//     //console.log(1);
//     //obj.arr.key = obj.arr.value;
//   });

//   //console.log(newData);
//   return obj;
// };
// console.log(1);
// console.log(processFn(data));
// console.log(2);
// console.log(data.map(Object.values));
// console.log(
//   Object.fromEntries([
//     [1, 2, "sdds"],
//     ["d", 2],
//     [3, "ds"],
//   ])
// );
// const rs = Object.fromEntries(data.map(Object.values));
// console.log(rs);
// //console.log(data);
