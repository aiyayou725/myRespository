// filter 方法返回一个新数组，作用是返回符合条件的数组

Array.prototype.myfilter = function (callback) {
  let res = [];
  for (let i = 0; i < this.length; i++){
    callback(this[i], i, this) && res.push(this[i]);
  }
  return res;
}

arr = [1, 2, 3, 7, 4, 8]
console.log(arr.filter((i, idx) => i > idx + 1));
console.log(arr.myfilter((i, idx) => i > idx + 1));

