// function deepCopy(obj) {
//   if (!obj || typeof obj !== 'object') return
//   let newObj = Array.isArray(obj) ? [] : {}
//   for (let k in obj) {
//     newObj[k] = typeof obj[k] === 'object' ? deepCopy(obj[k]) : obj[k]
//   }
//   return newObj
// }

// let obj = {
//   a: 1,
//   b: {
//     c: 5
//   },
//   d: [1, 2, 3]
// }

// let obj2 = deepCopy(obj)
// obj.a = 5
// obj.b.c = 10
// console.log(obj);
// console.log(obj2);

/**
 * 使用下面这个测试用例，出现的栈溢出的报错
 * 原因是 循环引用（对象的属性直接或间接引用对象本身）
 **/
// let a = {
//   val: 2
// };
// a.target = a;
// let res = deepCopy(a);
// console.log(res.target);


/**
 * 解决循环引用——额外开辟一个存储空间，存储当前对象和拷贝对象的对应关系
   当需要拷贝当前对象时，先去存储空间中找，是否拷贝过这个对象，如果拷贝过就直接返回，如果没有就继续拷贝
  * 存储空间需要存储键值形式的数据，且键可以是一个引用类型，选择 map这种数据结构
    * 检查map中有没有克隆过的对象
    * 有——直接返回
    * 没有——将当前对象作为key，克隆对象作为value存储
**/



function deepCopy(obj, map = new Map()) {
  let res;
  // 判断是否是引用类型，特别注意typeof null === "object"
  if (typeof obj === "object" && obj !== null) {
    // 复杂数据类型的类型
    res = Array.isArray(obj) ? [] : {};
    // map中有克隆过的对象,直接返回
    if (map.has(obj)) {
      return map.get(obj);
    }
    // map中没有克隆过的对象,进行存储
    map.set(obj, res);
    for (let k in obj) {
      // 遍历对象中的每个元素是否为对象类型
      res[k] = typeof obj[k] === "object" ? deepCopy(obj[k], map) : obj[k]
    }
  } else {
    // 简单数据类型 直接 = 赋值
    res = obj;
  }
  return res;
}
 
// 测试
let s = Symbol();
let a = {
  val: 2,
  [s]: 10
};
a.target = a;
let res = deepCopy(a);
console.log(res.target);





