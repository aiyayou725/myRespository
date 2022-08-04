// 给定数组，实现负号索引查找元素
// 给定 arr = [1, 2, 3, 4], 实现 arr[-1] = 4
// 本题考察的是 proxy 和 reflect 的应用
// 不管proxy如何修改默认行为，总可以在Reflect上获取到默认行为
// 保证原生行为能后正常执行
let arr = [1, 2, 3, 4]
function negativeIndex(arr) {
  let handle = {
    get(target, index, receiver) {
      index = Number(index)
      if (index < 0) {
        index += target.length
      } 
      return Reflect.get(target, index, receiver)
    }
  }
  return new Proxy(arr, handle) 
}

arr = negativeIndex(arr)
console.log(arr[-1]);
console.log(arr[-6]);
console.log(arr[2]);