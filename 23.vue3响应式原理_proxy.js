
const onWatch = (obj, getLogger, setBind) => {
  let handle = {
    get(target, property, receiver) {
      getLogger(target, property)
      return Reflect.get(target, property, receiver)
    },
    set(target, property, value, receiver) {
      setBind(value, property)
      return Reflect.set(target, property, receiver)
    }
  }
  return new Proxy(obj, handle)
}

const obj1 = {
  a: 0,
  b: 1
}
let p = onWatch(obj1,
  (targrt, property) => {
    console.log(`正在获取对象的属性${property},其值为${targrt[property]}`);
  },
  (v, property) => {
    console.log(`${property}的值被设置为${v}`);
  }
)

// p.b = 2;
p.a = 3;
console.log(p.a);