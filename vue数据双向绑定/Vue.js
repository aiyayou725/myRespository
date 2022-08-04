class Vue {
  constructor(obj_instance) {
    this.$data = obj_instance.data;
    // 数据劫持 —— 监听实例中的数据
    Observer(this.$data)
    // 把所有的数据都更新后再渲染页面 而不是获取一个元素渲染一次页面，减少频繁操作DOM
    // HTML 模板解析

  }
}
function Observer(data_instance) {
  // 递归出口
  if (!data_instance || typeof data_instance !== 'object') return
  const dependency = new Dependency()
  Object.keys(data_instance).forEach(key => {
    let value = data_instance[key]
    // 递归 —— 子属性劫持
    Observer(value)  
    Object.defineProperty(data_instance, key, {
      enumerable: true,
      configurable: true,
      get() { 
        console.log(`访问了属性：${key} -> 值：${value}`)
        // 订阅者加入依赖实例的数组
        Dependency.temp && dependency.addSub(Dependency.temp)
        return value
      },
      set(newvalue) {
        console.log(`属性${key}的值${value}修改为 -> ${newvalue}`);
        value = newvalue
        // 如果修改值为对象类型，则也要对其劫持
        Observer(newvalue)
        // 调用依赖的通知方法
        dependency.notify()
       }
      
    })
  })
}

// element: vue 实例中挂载的元素
function Compile(element, vm) {
  vm.$el = document.querySelector(element)
  // 创建文档碎片
  const fragment = document.createDocumentFragment()
  let child
  while (child = vm.$el.firstChuld) {
    // 把页面的子节点摘下来保存在 fragment 中（页面中就没有这个子节点了）
    fragment.append(child)
  }
  // 替换文档碎片的内容
  fragment_compile(fragment)
  function fragment_compile(node) {
    // 文本节点的类型是3，这里只需要替换插值表达式中的数据即可
    const pattern = /\{\{\s*(\S+)\s*\}\}/
    if (node.nodeType === 3) {
      const xxx = node.nodeValue
      const result_regex = pattern.exec(node.nodeValue)
      if (result_regex) {
        const arr = result_regex[1].split('.')
        const value = arr.reduce((total, current) => total[current], vm.$data)
        node.nodeValue = node.nodeValue.replace(pattern, value)
        // 创建订阅者
        new Watcher(vm, result_regex[1], newvalue => {
        node.nodeValue = xxx.replace(pattern, newvalue) 
        })
      }
      return
    } 
    node.childNodes.forEach(child => fragment_compile(child))
  }
  vm.$el.appendChild(fragment)
}

// 发布 —— 订阅模式

// Dependency 用来收集和通知订阅者
class Dependency {
  constructor() {
    // 存放订阅者信息
    this.subscribers = []
  }
    addSub() {
      this.subscribers.push(sub)
  }
  // 通知订阅者调用自身的 update 来更新
  notify() {
    this.subscribers.forEach(sub => sub.update())
    key.split('.').reduce((total, current) => total[current], vm.$data)
    Dependency.temp = null
  }
}

// 订阅者
class Watcher {
  constructor(vm, key, callback) {
    this.vm = vm
    this.key = key
    this.callback = callback
    // 临时属性 —— 触发 getter
    Dependency.temp = this
  }
  update() {
    const value = this.key.split('.').reduce(
      (total, current) => total[current], this.vm.$data
    )
    this.callback()
  }

}
