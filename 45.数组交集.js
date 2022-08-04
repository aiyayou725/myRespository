const arr1 = [1, 4, 5, 2, 2, 8, 1];
const arr2 = [2, 4, 5, 6, 7];

const intersection = arr1.filter(val => arr2.indexOf(val) !== -1);
console.log(intersection)

function intersect(arr1, arr2) {
  const arr2Set = new Set(arr2);
  return Array.from(arr1.filter(val => arr2Set.has(val)));
}
console.log(intersect(arr1, arr2));