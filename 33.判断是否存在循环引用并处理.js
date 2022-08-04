// 判断是否存在循环引用
function hasLoop(obj) {
  // 判断对象内部是否有和源相同的属性
  function findLoop(target, src) {
    const source = src.slice().concat([target])
    for (const key in target) {
      if (typeof target[key] === "object") {
        // 在源数组中找到或递归查找内部找到相同
        if (source.indexOf(target[key]) !== -1 || findLoop(target[key], source)) {
          return true
        }
      }
    }
    return false
  }
  return typeof obj === "object" ? findLoop(obj, []) : false
}


// 处理循环引用
function handleLoop(obj, parent) {
  let parentArr = parent || [obj]
  for (const key in obj) {
    if (typeof obj[key] === "object") {
      parentArr.forEach((pObj) => {
        if (pObj === obj[key]) {
          obj[key] = "[cycle]"
        }
      })
      handleLoop(obj[key], [...parentArr, obj[key]])
    }
  }
  return obj
}

const a = {
  b:{
      c:{}
  }
};

a.b.c.d = a

console.log(hasLoop(a))
console.log(handleLoop(a))