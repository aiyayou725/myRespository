async function async1() {
  await async2()                 // 下面的是 Promise 对象的微任务，所以先不执行，当 await 返回成功以后才会执行微任务
  console.log('async1 end');
}
async function async2() {
  console.log('async2 end');     // 这里没有加 await 因此就是一个普通的函数，是一个同步任务，因此可以先执行
}
async1()
console.log(10);

// 结果是 async2 end    10    async1 end



async function async1() {
  await async2()                 // 下面的是 Promise 对象的微任务，所以先不执行，当 await 返回成功以后才会执行微任务
  console.log('async1 end');     // 下面就会报错了，因为没有响应的失败的处理函数
}
async function async2() {
  console.log('async2 end');     // 这里没有加 await 因此就是一个普通的函数，是一个同步任务，因此可以先执行
  return Promise.reject(new Error())        // 如果 async2 失败了，就不会再执行 async1 里面 await 后面的代码
}
async1()
console.log(10);



async function async1() {
  try {
    await async2()
  } catch (e) {
    console.log('async1 end'); 
  }
}
async function async2() {
  console.log('async2 end');     // 这里没有加 await 因此就是一个普通的函数，是一个同步任务，因此可以先执行
  return Promise.reject(new Error())        // 如果 async2 失败了，就不会再执行 async1 里面 await 后面的代码
}
async1()
console.log(10);

 // 加了错误处理的回调函数，才可以返回第一种情况