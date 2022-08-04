
// map 方法会返回一个新数组，但不会改变原数组的值
Array.prototype.mymap = function (callback) {
  let res = [];
  for (let i = 0; i < this.length; i++){
    res.push(callback(this[i], i, this))
  }
  return res; 
}

let arr = [1, 2, 3];
console.log(arr.map(item => item + 2));
console.log(arr.mymap(item => item + 2));
console.log(arr);


