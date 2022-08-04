/*
  * 观察者模式   
    目标和观察者是基类， 目标提供维护观察者的一系列方法；观察者提供更新的接口。
    具体观察者和具体目标继承各自的基类，然后具体观察者把自己注册到具体目标里，在具体目标变化时，调度观察者的更新方法。
    * 发布者 —— 具体目标
      基本操作：增加订阅者，通知订阅者，移除订阅者
    * 订阅者 —— 具体观察者
      作为被动的一方，行为是被通知，去执行（本质是接受发布者的调用，是在发布者中完成的）
*/
// 观察者 （观察者）
class Observer {
  // cb 回调函数，收到目标对象通知时执行
  constructor(cb) {
    if (typeof cb === "function") {
      this.cb = cb
    } else {
      throw TypeError("Observer构造器必须传入函数类型")
    }
  }
  // 被目标对象通知时执行的回调函数
  update() {
    this.cb()
  }
}

// 目标对象，发布者类
class Subject {
  constructor() {
    // 维护观察者列表
    this.observers = []
  }
  // 添加一个观察者
  add(observer) {
    this.observers.push(observer)
  }
  // 移除一个观察者
  remove(observer) {
    this.observers.forEach((item, i) => {
      if (item === observer) {
        this.observers.splice(i, 1)
      }
    })
  }

  // 通知所有观察者
  notify() {
    this.observers.forEach(observer => {
      observer.update()
    })
  }
}

const observerCallback = function() {
    console.log(`被通知了`);
}
const observer1 = new Observer(observerCallback);
const observer2 = new Observer(observerCallback);
 
const subject = new Subject();
subject.add(observer1);
subject.add(observer2);
subject.notify(); // 我被通知了
console.log("-------------")
subject.remove(observer2)
subject.notify()