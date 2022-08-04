// 柯里化函数
function curry() {
  let args = [...arguments].slice(1);
  let [fn] = [...arguments].slice(0,1);
  let inner = function() {
    args = [...args, ...arguments];
    return inner;
  };
  inner.toString = function () {
    return fn.apply(null, args);
  };
  return inner;
}

function f() {
return [...arguments].forEach((item) => {
  console.log(item)
})
}

let test = curry(f);
test(1)(2)(4)(5,6).toString()
console.log(test(1)(2)(4)(5,6).toString());

console.log("--------------------------------------")


/* 实现
   add(1)(2)(3) = 6
   add(1,2,3)(4) = 10
   add(1)(2,3)(4)(5) = 15
*/ 

function add() {
  const args = Array.from(arguments)
  const _add = function () {
    args.push(...arguments)
    return _add
  }
  _add.toString = function () {
    return args.reduce((prev, cur) => prev + cur)
  }
  return _add
}

// + 为了让他隐式转换，之后调用改写的 toString 方法
console.log(add(1)(2)(3).toString());
console.log(+add(1)(2, 3)(4));
console.log(+add(1)(2, 3)(4)(5));

