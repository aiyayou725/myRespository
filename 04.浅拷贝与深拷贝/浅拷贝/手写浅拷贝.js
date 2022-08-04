// 一维对象深拷贝，多维对象浅拷贝（与Object.assign和扩展运算符一样）
// 数组的拷贝和 slice 、concat、 扩展运算符一样

function shallowCopy(obj) {
  if (!obj || typeof obj !== 'object') return
  let newObj = Array.isArray(obj) ? [] : {}
  for (let k in obj) {
    newObj[k] = obj[k]
  }
  return newObj
}

obj = {
  a: 1,
  b: {
    c: 3
  }
}
let obj2 = shallowCopy(obj)
obj.a = 10
obj.b.c = 30
console.log(obj2);   //  { a: 1, b: { c: 30 } }
console.log(obj);    //  { a: 10, b: { c: 30 } }

arr = [1, 2, 3]
console.log(shallowCopy(arr) === arr);  // false