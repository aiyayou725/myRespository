// 数组的 includes 方法会在数组中查找是否包含某个元素，第二个参数的索引值，表示查找的起始位置

Array.prototype.myIncludes = function (val, startIndex = 0) {
  if (startIndex < 0) {
    startIndex = startIndex + this.length;
  }
  if (startIndex > this.length) return false;
  for (let i = startIndex; i < this.length; i++){
    if (this[i] === val) return true
  }
  return false;
}

let arr = [1, 2, 3, 5, 8]
let str = ['ssd', 'sdasd', 'cceed']
console.log(arr.includes(3, -4));
console.log(arr.myIncludes(3, -4));
console.log(arr.includes(7));
console.log(arr.myIncludes(7));

console.log(arr.includes(1, 9));
console.log(arr.myIncludes(1, 9));

