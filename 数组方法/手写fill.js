// fill 方法用第一个参数填充数组从起始索引到终止索引，不包括终止索引，返回修改后的原数组，不创建新数组
// array.fill(val [,start [,end]])
// 参数一 val：用来填充数组的内容
// 参数二 start：填充的起始位置  默认为0
// 参数三 end：填充的终止位置，不包括 end 位置  默认为this.length
// 如果索引值为负，则就用 this.length 加上去

Array.prototype.myFill = function (val, start = 0, end = this.length) {
  if (start < 0) {
    start = start + this.length;
  }
  if (end < 0) {
    end = end + this.length;
  }
  if (start > end || start > this.length) {
    return this;
  }

  for (let i = start; i < end; i++){
    this[i] = val;
  }
  return this;  
}
let arr = new Array(5)
console.log(arr.fill(1, 0, 1));
console.log(arr.myFill(1, 0, 1));
console.log(arr.fill(1, -3, -1));
console.log(arr.myFill(1, -3, -1));
console.log(arr.fill(1));
console.log(arr.myFill(1));
