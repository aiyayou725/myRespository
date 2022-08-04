console.log('start');                     // 1
async function async1() {
  await async2()
  console.log('async1 end');              // await 后面的是微任务 并且这个微任务先注册   5
}
async function async2() {
  console.log('async2 end');              // 2
}
async1()
setTimeout(() => {
  console.log('setTimeout');               // 8 异步任务最后执行
})
new Promise(resolve => {
  console.log('Promise');                // 3
  resolve()
})
  .then(() => {                                // promise.then 也是微任务
    console.log('promise1');                   // 6
  })
  .then(() => {
    console.log('promise2');              // 7
  })
  console.log('end');                   // 4

// 结果： start   async2 end    Promise    end    async1 end    promise1    promise2    setTimeout