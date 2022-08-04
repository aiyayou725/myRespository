const arr1 = [1, 4, 5, 2, 8];
const arr2 = [2, 4, 5, 6, 7];

const union1 = arr1.concat(arr2.filter(val => arr1.indexOf(val) === -1))
console.log(union1);

const union2 = Array.from(new Set(arr1.concat(arr2)))
console.log(union2);

