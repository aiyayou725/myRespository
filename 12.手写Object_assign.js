// Object.assign() 方法将所有可枚举和自有属性从一个或多个源对象复制到目标对象，返回修改后的对象。
// hasOwnProperty() 方法会返回一个布尔值，指示对象自身属性中是否具有指定的属性
Object.myAssign = function (target, source) {
  if (arguments.length < 2) {
    return target
  }
  let source = Array.prototype.slice.call(arguments, 1)
  source.forEach((obj) => {
    for (let key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        target[key]=obj[key]
      }
    }
  })
  return target
}


let ss = Symbol('sss')
let obj = {
  a: 1,
  b: {
    c: 10
  },
  [ss]: 888,
  d: function(){
    console.log('你好');
  }
}
Object.defineProperty(obj, "x", {
  value: 777,
  // enumerable: true
})


let obj2 = {
  y: 111
}

let target = {
  a: 20,
  e: 100
}

const v1 = 'abc';  
let res1 = Object.assign(target, obj, obj2, v1);
let res2 = Object.myAssign(target, obj, obj2, v1);

console.log(res1);
console.log(res1 === target);
console.log(res2);
console.log(res2 === target);