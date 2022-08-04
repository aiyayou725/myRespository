/*
  * 发布/订阅模式
    订阅者把自己想订阅的事件注册到调度中心；
    当该事件触发时，发布者发布该事件到调度中心；
    由调度中心统一调度订阅者注册到调度中心的处理代码

  * 前端框架中的Event Bus和node中的Event Emitter都是发布/订阅模式，对应一个共同的角色 —— 全局事件总线
 
  * 发布/订阅模式中，包含发布者，事件调度中心，订阅者是三个角色；
    发布者和订阅者是松散耦合的，互不关心对方是否存在，关注的是事件本身
    发布者借用事件调度中心提供的emit方法发布事件，而订阅者则通过on进行订阅
*/


class EventEmitter {
  constructor() {
    this.listeners = {}
  }

  // 注册事件监听者on方法用于安装事件监听器，接收目标事件名和回调函数作为参数
  on(eventName, cb) {
    // 检查目标事件名有没有对应的监听函数队列
    if (!this.listeners[eventName]) {
      // 如果没有，首先初始化一个监听函数队列
      this.listeners[eventName] = []      
    }
    // 把回调函数推入目标事件的监听函数队列里去
    this.listeners[eventName].push(cb)
  }

  // 发布事件 —— emit方法用于触发目标事件，接收事件名和监听函数作为参数
  emit(eventName, ...args) {
    // 检查目标事件是否有监听函数队列
    if (this.listeners[eventName]) {
      // 如果有，逐个调用队列里的回调函数
      this.listeners[eventName].forEach((cb) => {
        cb(...args)
      })
    }  
  }
  
  // off方法移除某个事件的一个监听者，移除某个事件回调队列里的指定回调函数
  off(eventName, cb) {
    if (this.listeners[eventName]) {
      const callbacks = this.listeners[eventName]
      const index = callbacks.indexOf(cb)
      if (index !== -1) {
        callbacks.splice(index, 1)
      }
      if (this.listeners[eventName].length === 0) {
        delete this.listeners[eventName]
      }
    }
  }

  // 移除某个事件的所有监听者
  offAll(eventName) {
    if (this.listeners[eventName]) {
      delete this.listeners[eventName]
    }
  }

  // once 为事件注册单次监听器
  once(eventName, cb) {
    // 对回调函数进行包装，使其执行完毕自动被移除
    const wrapper = (...args) => {
      cb.apply(this, args)
      this.off(eventName, cb)  
    }
    this.on(eventName, wrapper)
  }
}

const ee = new EventEmitter()
ee.on("chifan", function () {
  console.log("吃饭了，我们走!");
})
ee.emit("chifan")
ee.on("chifan", function (address, food) {
  console.log(`吃饭了，我们去${address}吃${food}`);
})
ee.emit("chifan", "食堂", "麻辣烫")



const toBeRemovedListener = function() { console.log('我是一个可以被移除的监听者') };
ee.on('testoff', toBeRemovedListener);
ee.emit('testoff');
ee.off('testoff', toBeRemovedListener);
ee.emit('testoff'); // 此时事件监听已经被移除，不会再有console.log打印出来了
 
// 测试移除chifan的所有事件监听
ee.offAll('chifan');
console.log(ee); // 此时可以看到ee.listeners已经变成空对象了，再emit发送chifan事件也不会有反应了

