setTimeout(() => {
  console.log('timer1');
  Promise.resolve().then(() => {
    console.log('promise1');
  })
})

Promise.resolve().then(() => {
  console.log('promise2');
  setTimeout(() => {
    console.log('timer2');
  })
})

// setTimeout 是一个异步任务，因此其回调函数先放在异步任务队列中
// Promise.resolve() 返回的是一个 Promise 对象，promise.then 是一个微任务，所以微任务会先执行
// 先打印 promise2  后面的 setTimeout 是异步任务放在任务队列中，此时就开始执行第一个定时器中的任务
// 第一个定时器的第一个任务是同步任务，打印 timer1   后面的 then 是一个微任务 打印 promise1
// 最后打印 timer2

// 执行结果为 promise2  timer1  promise1 timer2

// 注意此处的定时器设置的时间都是0，因此就是谁先进入异步任务队列谁先执行，但是如果设置了时间，就是谁先到时间谁先执行
