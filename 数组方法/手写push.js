arr = [1, 2, 3]

// 手写push方法   ！！！push 的返回值是 push 完之后数组的长度
Array.prototype.myPush = function () {
  for (let i = 0; i < arguments.length; i++){
    this[this.length] = arguments[i];
  }
  return this.length;
}

arr.myPush([1, 2])
console.log(arr);
console.log(arr.myPush(1, 2));