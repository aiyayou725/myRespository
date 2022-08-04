// find 返回第一个满足条件的值，都不满足就返回 undefined  不会改变原数组

Array.prototype.myFind = function (callback) {
  for (let i = 0; i < this.length; i++){
    if (callback(this[i], i, arr)) {
      return this[i];
    }
  }
}

let arr = [1, 2, 8, 6, 9];
console.log(arr.find(i => i > 2));
console.log(arr.myFind(i => i > 2));
console.log(arr.find((i, idx) => idx === 5 ));
console.log(arr.myFind((i, idx) => idx === 5));