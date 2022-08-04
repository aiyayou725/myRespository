// promise 自己本身是一个同步任务，因此会根据顺序会先打印1,2,4 ( resolve 不会终止函数)
// 在 promise.then 是一个微任务 最后打印3
const promise = new Promise((resolve, rejrct) => {
  console.log(1);
  resolve()
  console.log(2);
})

promise.then(() => {
  console.log(3);
})
console.log(4);

// 执行结果 1  2  4  3