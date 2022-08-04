/**
  * 支持对象，数组，日期，正则的拷贝
  * 处理原始数据（原始类型直接返回）
  * 处理 symbol 作为键名的情况
  * 处理函数（函数直接返回，拷贝函数没有意义，两个对象使用内存中同一个地址的函数问题不大）
  * 额外开辟一个存储空间 WeakMap ，解决循环引用递归爆栈的问题（target.target = target）
**/

function deepClone(target, map = new Map()) {
  if (target === null) return target
  if (target instanceof Date) return new Date(target)
  if (target instanceof RegExp) return new RegExp(target)

  if (typeof target !== 'object') return target

  if (map.has(target)) return map.get(target)
  const cloneTarget = new target.constructor()
  map.set(target, cloneTarget)
/**
 * Object.keys() 返回对象的所有属性，不包括不可枚举的属性
 * Reflect.ownKeys() 返回所有属性，可以用来处理 Symbol 作为键名的情况
**/
  Reflect.ownKeys(target).forEach(key => {
    cloneTarget[key] = deepClone(target[key], map)
  })
  return cloneTarget
}
let s = Symbol()
let obj = {
  a: 2,
  b: {
    c: [1, 2, 3]
  },
  fn: ()=>{},
  [s]: 10
}
obj.x = obj;

let objClone = deepClone(obj)
obj[s] = 200;
obj.a = 20
obj.b.c[0] = 30
console.log(obj);
console.log(objClone);


