// text1 两道题不要同时执行，可能有异步任务，执行顺序有错
let p1 = new Promise((resolve, reject) => {
  reject(42)
})
p1.catch(value => {
  console.log(value);
  return value + 1           // return 一个普通值会经过 Promis.resolve 包装，因此返回的是一个 Promise 对象，状态为 fullfilled
}).then((value) => {
  console.log(value);
})

// 返回结果 42  43




// text2
const p3 = new Promise((resolve, reject) => {
  resolve(42)
})
let p4 = new Promise((resolve, reject) => {
  reject(43)
})
p3.then(value => {
  console.log(value)         // p1 成功，因此打印 resolve 传过来的值 42
  return p4                  // 返回的是一个错误状态的 Promise 但是没有对应的处理错误的会回调函数，因此此处会报错
}).then(value => {
  console.log(value);
})

// 执行结果为  42  报错