// promise 的状态

// text1
Promise.resolve()                        // 返回成功的结果，执行第一个 then
  .then(() => {
    return new Error('error');           // 第一个 then 抛出一个错误，但是外部定义的错误并不会使 promise 的状态变成reject
  })                                     // 抛出错误写在了成功的回调函数中， 因此 promise 的状态为成功，执行下一个 then
  .then((res) => {
    console.log('then:', res);           // 执行 then 返回catch Error：error
  })
  .catch((err) => {
    console.log('catch:', err);           
  })

  // 返回结果  then: Error: error

// text2
  const promise = new Promise((resolve, reject) => {
    resolve('success1')                 // promise 的状态一旦确定就不会在更改，因此，先 resolve 后面不执行
    reject('error')
    resolve('success2')
  })
  
  promise
    .then((res) => {
      console.log('then' + res);        // then success1
    })
    .catch((err) => {
      console.log('catch' + err);
    })