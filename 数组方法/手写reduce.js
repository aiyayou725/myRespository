// reduce 方法：数组中的每一个元素会依次执行回调函数，返回一个结果
// 回调函数中有三个参数
// 参数一： prev：如果 reduce 有第二个参数，则 prev 的初始值为第二个参数；如果没有第二个参数，初始值为数组的第一个元素
              // 之后会循环数组的每一项执行回调函数，此时 prev 为上一次回调函数的结果
// 参数二：cur：当前循环的数组元素项
// 参数三：当前循环的数组元素项的索引
// 参数四：执行 reduce 方法的数组

// 如果 reduce 方法没有传初始值，那么循环会从 i=1 开始，打印的（prev，cur，i）为（arr[0]， arr[1]，1）
// 如果 reduce 方法传入初始值，那么循环会从 i=0 开始，打印的（prev，cur，i）为（init， arr[0]，0）

Array.prototype.myReduce = function (callback, initValue) {
  let init = 0;
  if (initValue) {
    init = initValue;
  }
  let val = init === 0 ? this[0] : init;
  for (let i = init === 0 ? 1 : 0; i < this.length; i++){
    val = callback(val, this[i], i, this)
  }
  return val;
}

let arr = [1, 2, 3, 5, 9, 7];
console.log(arr.reduce((prev, cur) => prev + cur));
arr.reduce((prev, cur, i) => {
  console.log(prev, cur, i)
  return prev + cur
})

console.log(arr.myReduce((prev, cur) => prev + cur));
arr.myReduce((prev, cur, i) => {
  console.log(prev, cur, i)
  return prev + cur
})
arr.reduce((prev, cur, i) => {
  console.log(prev, cur, i)
  return prev + cur
}, 1)
arr.myReduce((prev, cur, i) => {
  console.log(prev, cur, i)
  return prev + cur
}, 1)


// console.log(arr.myReduce((prev, cur) => prev + cur));
