// 方法一
let a1 = 10;
let b1 = 20;
[a1, b1] = [b1, a1];
console.log('a1 =  ' + a1);
console.log('b1 =  ' + b1);

// 方法二
let a2 = 5;
let b2 = 6;
a2 = a2 + b2;
b2 = a2 - b2;
a2 = a2 - b2;
console.log('a2 =  ' + a2);
console.log('b2 =  ' + b2);

// 应用：实现数组的乱序输出
let arr = [1, 2, 3, 4, 5, 4, 7];
function disorderedArr(arr) {
  // 如果不想改变原数组
  // const disorder = arr.concat();
  // for (let i = 0; i < disorder.length; i++) {
  //   let index = Math.floor(Math.random() * (disorder.length - i)) + i;
  //   [disorder[i], disorder[index]] = [disorder[index], disorder[i]];
  // }
  // return disorder;

  // 洗牌算法
  for (let i = arr.length-1; i >0; i--){
    let index = Math.floor(Math.random() * (i + 1));
    [arr[index], arr[i]] = [arr[i], arr[index]];
  }
}
console.log("----------------------------------")
console.log(disorderedArr(arr));



