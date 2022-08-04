/**
 * 输入 s="3[a]2[bc]"  输出："aaabcbc"
 */

function decodeStrig(s) {
  const reg = /[a-zA-Z]+|[0-9]+|\[|\]/g;
  const stack = [];
  const peek = () => stack[stack.length-1];

  // reg.lastIndex 存放一个整数，声明的是上一次匹配文本后的第一个字符的位置
  // 上一次匹配的结果是由exec() 和 text() 方法找到的，都以lastIndex属性所指的位置作为下次检索的起点
  while (reg.lastIndex < s.length) {
    let token = reg.exec(s)[0];
    if (token !== "]") {
      stack.push(token);
    } else {
      let str = "";
      while (peek() !== "[") {
        str = stack.pop() + str;
      }
      stack.pop();
      const num = stack.pop();
      stack.push(str.repeat(num))
    }
  }

  return stack.join("")
}

console.log(decodeStrig("3[a]2[bc]"))