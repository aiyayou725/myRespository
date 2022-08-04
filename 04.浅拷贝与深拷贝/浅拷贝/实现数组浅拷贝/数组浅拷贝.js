let arr = [1, 2, 3]

// 数组的 slice 方法实现数组浅拷贝
let arr_slice = arr.slice()
console.log('slice 方法');
console.log(arr);
console.log(arr_slice);
console.log(arr === arr_slice);  // false


// 数组的 concat 方法实现数组的深拷贝
let arr_concat = arr.concat()
console.log('concat 方法');
console.log(arr);
console.log(arr_concat);
console.log(arr === arr_concat);   // false


// 扩展运算符
let arr1 = [...arr]
console.log('扩展运算符');
console.log(arr);
console.log(arr1);
console.log(arr === arr1);   // false

// !!!!!  赋值(和上面的都不一样)
let arr2 = arr
console.log('赋值');
console.log(arr);
console.log(arr2);
console.log(arr === arr2);  // true
