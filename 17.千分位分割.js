/* 
  将普通数字转换为带千分位分隔符的数字字符串
  数字的整数部分每三位一组，以","分节，小数部分不分节
*/
// 方法一
function numFormat(num) {
  // 分割小数点
  num = num.toString().split('.')     // 分割为小数部分和整数部分 
  let arr = num[0].split('').reverse()
  let res = []
  for (let i = 0; i < arr.length; i++){
    if (i % 3 === 0 && i !== 0) {
      res.push(",")
    }
    res.push(arr[i])
  }
  res.reverse()
  if (num[1]) {
    return res.join("").concat("." + num[1])
  } else {
    return res.join("")
  }
}


var a = 1234567894532;
var b = 673439.4542;
console.log(numFormat(a));
console.log(numFormat(b));

// 方法二
/*
 JS自带的函数 toLocaleString
 语法： numObj.toLocaleString([locales [, options]])
 toLocaleString() 方法返回这个数字在特定语言环境下的表示字符串
*/
console.log(a.toLocaleString());
console.log(b.toLocaleString());



// 方法三：正则表达式和replace函数
function numFormat2(num) {
  let res = num.toString().replace(/\d+/, function (n) {
    return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
      return $1+","
    })
  })
  return res;
}

console.log(numFormat2(a));
console.log(numFormat2(b));