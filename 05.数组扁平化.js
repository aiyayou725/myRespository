// 数组扁平化（多维数组变成一维数组）
// 如 arr = [1, [2, 3, [4, 5]]]  ===> arr = [1, 2, 3, 4, 5]

const arr = [1, [2, 3, [44, 5]]]

// 方法一：concat + 递归
function flat1(arr) {
  let res = [];
  if (!Array.isArray(arr)) {
    return [arr];
  } else {
    for (let i = 0; i < arr.length; i++){
      res = res.concat(flat1(arr[i])) 
    }
    return res
  }
}
console.log(flat1(arr));


// 方法二： ES10 的 flat 方法， 给 flat 方法一个参数，会按找指定的深度递归遍历数组，并将所有的元素
// 与遍历到的子数组中的元素合并为一个新数组
console.log(arr.flat(1));   // [1, 2, 3, [4, 5]]
console.log(arr.flat(2));   // [1, 2, 3, 4, 5]
console.log(arr.flat(Infinity));   // [1, 2, 3, 4, 5]

// 方法三： 使用 reduce() + concat()
function flat2(arr) {
  return arr.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? flat2(cur) : cur)
  }, [])
}
console.log(flat2(arr));

function flat22(arr, depth = 1) {
  return depth ?
    arr.reduce((prev, cur) => {
      return [...prev, ...(Array.isArray(cur)) ? flat22(cur, depth-1) : [cur]]
    }, []) : arr;
}
console.log("-----------")
console.log(flat2(arr));
console.log("-----------")



// 方法四： 使用 some + 扩展运算符... + concat
function flat3(arr, depth=1) {
  while (depth > 0 && arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr);
    depth--;
  }
  return arr;
}
console.log(flat3(arr));

// 方法五：toString + split
function flat4(arr) {
  return arr.toString().split(',').map(item => Number(item))
}
console.log(flat4(arr));



