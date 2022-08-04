// Promise.resolve()
//   .then(() => {
//     Promise.resolve().then(() => {
//       console.log(1)
//     }).then(() => {
//       console.log(2);
//     })
//   })
//   .then(() => {
//     console.log(3);
//   })

  // 1 和 3 的 then 属于同一级，因此执行完 1 之后， 就会执行 3 ，最后执行2
  // 1  3  2



  Promise.resolve()
  .then(() => {
    return Promise.resolve().then(() => {
      console.log(1)
    }).then(() => {
      console.log(2);
    })
  })
  .then(() => {
    console.log(3);
  })

  // 加了 return 之后后面的 promise 是一个整体了，只有这个整体有了结果， 3 才可以执行
  // 上面的结果是   1  2  3