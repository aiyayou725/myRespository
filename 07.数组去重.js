let arr = [1, 1, 2, 2, 5, 4, 5, 9, 6];

// set
function uniqueArray1(arr) {
  let set = new Set(arr);
  return Array.from(set); 
}
console.log(uniqueArray1(arr));


// map
function uniqueArray2(arr) {
  let map = new Map()
  let newarr = [];
  for (let i = 0; i < arr.length; i++){
    if (map.has(arr[i])) {
      continue;
    }
    map.set(arr[i], 1);
    newarr.push(arr[i])
  }
  return newarr; 
}

console.log(uniqueArray2(arr));

// indexOf / includes
function uniqueArray3(arr) {
  let newarr = [];
  for (let i = 0; i < arr.length; i++){
    if (newarr.includes(arr[i])) {
    // if(newarr.indexOf(arr[i] !== -1))
      continue;
    }
    newarr.push(arr[i]);
  }
  return newarr;
}
console.log(uniqueArray3(arr));


