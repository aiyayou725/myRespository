// 基本数据类型：拷贝的就是基本数据类型的值
// 引用数据类型：拷贝的是该数据对应的内存地址，如果修改其中一个对象的属性，则另一个对象也会变化

// Object.assign  一维对象深拷贝，多维对象浅拷贝 （与扩展运算符... 效果一样）
let obj1 = {
  a: 1,
  b: {
    c: 5
  }
}
let target = {}
Object.assign(target, obj1)
target.b.c = 10  // Object.assign 实现对多维对象的浅拷贝 改变 target.b.c    obj3.b.c 也跟着变化
target.a = 20   // Object.assign 实现一维对象的深拷贝，这里改变了 target.a    obj3.a 并没有变化
console.log(target);
console.log(obj1);