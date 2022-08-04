// instanceof 判断数据类型是 a 是否是 b 的实例
// 原理是在原型链上查找
// instanceof 只能判断引用数剧类型
function myInstanceof(a, b) {
  let aproto = a.__proto__;
  while (aproto) {
      if (aproto === b.prototype) return true;
      aproto = aproto.__proto__;
  }
  return false;
}

const fn = () => {}
console.log([] instanceof Array);
console.log(fn instanceof Function);
console.log({} instanceof Object);


console.log(myInstanceof([], Array));
console.log(myInstanceof(fn, Function));
console.log(myInstanceof({}, Object));







