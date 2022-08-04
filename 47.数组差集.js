const arr1 = [1, 2, 8, 12];
const arr2 = [2, 3, 4, 5, 6];
const difference = arr1.filter((val) => arr2.indexOf(val) === -1)
 
console.log(difference)

const difference2 = function (arr1, arr2) {
  const set2 = new Set(arr2);
  const diff = [];
  arr1.forEach(val => {
    if (!set2.has(val)) {
      diff.push(val)
    }   
  });
  return diff;
}

console.log(difference2(arr1,arr2))