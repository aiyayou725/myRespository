// 数组的 every 方法， 判断回调函数的结果，都为真时才返回真，有一个为假就返回假

Array.prototype.myevery = function (callback) {
  for (let i = 0; i < this.length; i++){
    if (!callback(this[i], i, arr)) {
      return false;
    }
  }
  return true;
}


let arr = [1, 2, 8, 6, 9];
console.log(arr.every(i => i > 0));
console.log(arr.myevery(i => i > 0));
console.log(arr.every(i => i > 2));
console.log(arr.every(i => i > 2));

