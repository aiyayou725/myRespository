// 实现一个柯里化函数，可以把任何函数柯里化
// 柯里化：把接收多个参数的函数变换成接收一个单一参数（最初函数的第一个参数）的函数，并且返回接收余下的参数的新函数的技术
// 柯里化的好处：参数复用（利用了闭包和高阶函数的特性）
//              延迟运行（例如 js 中的 bind 方法，实现的机制就是 curry）

// 通用的柯里化函数
function curry(fn, ...args) {
  // fn 需要的参数是否够了
  // fn.length 会返回函数形参的长度
  if (args.length >= fn.length) {
    // 如果够了，直接执行 fn 并返回结果
    return fn(...args)
  }
  // 递归调用，否则拼接参数，直到 fn 的参数够了，执行 Fn 并返回结果
  return (...rest) => {
    return curry(fn, ...args, ...rest)
  }
}

const add = (x, y, z) => x + y + z
const curryAdd = curry(add, 1, 2);
console.log(curryAdd(3));





