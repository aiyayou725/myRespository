// forEach 方法没有返回值,不会改变原数组
Array.prototype.myforEach = function (callback) {
  for (let i = 0; i < this.length; i++){
    callback(this[i], i, this)
  }
}

let arr = [1, 2, 3];
arr.myforEach((item, i) => console.log(item + i))
arr.forEach((item, i) => console.log(item + i))

