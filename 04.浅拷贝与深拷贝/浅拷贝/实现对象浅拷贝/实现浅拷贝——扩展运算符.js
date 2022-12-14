// 基本数据类型：拷贝的就是基本数据类型的值
// 引用数据类型：拷贝的是该数据对应的内存地址，如果修改其中一个对象的属性，则另一个对象也会变化

// 扩展运算符，一维深拷贝，多维浅拷贝 (与 Object.assign 效果一样)
let obj1 = {
  a: 1,
  b: {
    c: 10
  }
}
let obj2 = {...obj1}
obj2.a = 3;
obj2.b.c = 20;

console.log(obj1);  // { a: 1, b: { c: 20 } }
console.log(obj2);  // { a: 3, b: { c: 20 } }

