// 深拷贝是重新开辟一个堆内存空间保存引用类型数据，二者互不影响
// 通过 JSON.stringify 和 JSON.parse 实现深拷贝
// 拷贝的对象如果有函数、undefined、symbol 在经过 JSON.stringify 处理后都会消失
// 因为 JSON 数据不允许出现上述类型
let s = Symbol()
let obj1 = {
  a: 0,
  b: {
    c: 0
  },
  [s]: 's'
};
let obj2 = JSON.parse(JSON.stringify(obj1));
obj1.a = 1;
obj1.b.c = 1;
console.log(obj1); // {a: 1, b: {c: 1}} 
console.log(obj2); // {a: 0, b: {c: 0}}


