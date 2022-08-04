// findIndex 返回第一个满足条件的元素的索引，没有找到就返回-1
Array.prototype.myFindIndex = function (callback) {
  for (let i = 0; i < this.length; i++){
    if (callback(this[i], i, this)) {
      return i;
    }
  }
  return -1;
}

let arr = [1, 4, 9, 2, 6];
console.log(arr.findIndex((item, i) => item > i + 1));
console.log(arr.myFindIndex((item, i) => item > i + 1));

console.log(arr.findIndex((item, i) => item > 10));
console.log(arr.myFindIndex((item, i) => item > 10));



