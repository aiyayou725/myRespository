// 循环中使用闭包解决 var 定义函数的问题
// 下面将会输出一堆 5, 上面的for内部是同步执行的，setTimeout是异步执行的
for (var i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i);
  },1000)
}

// 解决一  将var换成let
for (let i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i);
  },1000)
}

// 解决二  通过一个立即执行函数将每一次i传递给形参j
for (var i = 0; i < 5; i++) {
  (function (j) {
    setTimeout(() => {
      console.log(j);
    }, 1000)
  })(i)
}


// 解决三  setTimeout 的第三个参数，是把参数传递给回调函数
for (var i = 0; i < 5; i++) {
  setTimeout((j) => {
    console.log(j);  
  },1000,i)
}