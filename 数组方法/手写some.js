// 有一个为真就返回真

Array.prototype.mySome = function (callback) {
  for (let i = 0; i < this.length; i++){
    if (callback(this[i], i, arr)) {
      return true;
    }
  }
  return false;
}

let arr = [1, 2, 8, 6, 9];
console.log(arr.some(i => i > 10));
console.log(arr.mySome(i => i > 10));

console.log(arr.some(i => i > 8));
console.log(arr.mySome(i => i > 8));

