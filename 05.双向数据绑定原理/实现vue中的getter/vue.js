class Vue {
  constructor(option) {
    this.$data = option.data

    // 调用数据劫持的方法
    Observer(this.$data) 

    // 属性代理
    Object.keys(this.$data).forEach((key) => {
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get() {
          return this.$data[key]
        },
        set(newVal) {
          this.$data[key] = newVal 
        }
      })
    })

    // 调用模板编译的函数
    Compile(option.el, this)


  }
}

// 定义一个数据劫持的方法
function Observer(obj) {
  // 如果没有递归，就只能给第一层对象设置 getter 和 setter
  if(!obj || typeof obj !== 'object') return
   // 通过 Object.keys 获取到当前对象上的每一属性，返回一个属性名组成的数组
  Object.keys(obj).forEach(key => {
    // 当前循环项 key 所对应的属性值
    let value = obj[key]
    // 如果 value 是对象就再遍历一层，为对象中的对象添加 setter 和 getter
    Observer(value)
    // 需要为当年 key 对应的属性添加 getter 和 setter
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        console.log(`有人获取了${key}的值`);
        return value
      },
      set(newVal) {
        value = newVal
        // 如果给一个对象的对象赋值了一个新对象，那这个对象的对象指向的新对象
        // 没有 getter 和 setter 方法，所以要再添加一次
        Observer(newVal)
      }
    })
  })
}

function Compile(el, vm) {

}