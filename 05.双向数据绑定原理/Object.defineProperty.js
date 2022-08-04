const { set } = require("express/lib/application");

const obj = {
  name: 'zs',
  age: 20
}
Object.defineProperty(obj, 'name', {
  enumerable: true,           // 是否允许被遍历
  configurable: true,          // 是否允许被配置 delete 等操作
  get() {
    console.log('有人获取了 obj.name 的值');
  },
  // 当触发了 set 就说明数据变化了，就应该调用发布者的 notify 方法，去通知订阅者（DOM元素）
  set() {
    console.log('有人设置了 obj.name 的值');  
  }
})

console.log(obj.name);