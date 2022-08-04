// 快手原题
let a;
const b = new Promise((resolve, reject) => {
  console.log('promsie1');       // 1 后面的都是微任务
  resolve();
}).then(() => {
  console.log('promise2');       // 4
}).then(() => {
  console.log('promise3');       // 5
}).then(() => {
  console.log('promise4');       // 6
})

a = new Promise(async (resolve, reject) => {
  console.log(a);               // 2  a 在promise内部，表示a还没有完成赋值  所以是 undefined
  await b; // b 的返回值是最后一个 .then 的返回值 也就是 promise4 那里 没有返回值 就是一个成功态的undefined   resolve(undefined)
  console.log(a);//7 同步任务已经完成（微任务都已经完成了），所以a也赋值了，但是上面的await b 虽然是resolve，但没有接收，所以a是pendding态的promise        
  console.log('after1');     // 8
  await a;     // 此时a还是pendding态的，但是 await 是成功之后的结果 ，所以后面的都不会执行
  resolve(true);
  console.log('after2');
})
console.log('end');          // 3