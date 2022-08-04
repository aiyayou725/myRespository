// 发布者的类  作用：收集依赖（订阅者）
class Dep {
  constructor() {
    // 这个 subs 用来存放所有订阅者的信息
    this.subs = []
  }
  // 向 subs 数组中添加订阅者的信息
  addSub(watcher){
    this.subs.push(watcher)
  }
// 发布订阅的方法
  notify() {
    this.subs.forEach((watcher) => {
      watcher.update()
    })
    
  }
}


// 订阅者的类（也就是DOM元素）
class Watcher {
  // cb 就是拿到发布者通知的最新的数据时来更新自己的回调函数
  constructor(cb) {
    this.cb = cb
  }
  update() {
    this.cb()  
  }
}

const w1 = new Watcher(() => {
  console.log('第1个订阅者');
})

const w2 = new Watcher(() => {
  console.log('第2个订阅者');
})

const dep = new Dep()
// 添加订阅者
dep.addSub(w1)
dep.addSub(w2)

// 发布通知，订阅者执行相应的回调函数
dep.notify()

// 我们只要为 vue 中的data数据重新赋值了，这个赋值的动作会被
// vue 监听到，然后 vue 要把数据的变化通知到每个订阅者
// 接下来，订阅者（DOM元素）要根据最新的数据，更新自己的内容
