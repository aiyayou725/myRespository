function HEXAtoRGB(str) {
  let reg = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
  if (!reg.test(str)) return;
  let newStr = (str.toLowerCase()).replace(/\#/g, "");
  let len = newStr.length;
  if (len === 3) {
    let t = "";
    for (let i = 0; i < len; i++) {
      t += newStr.slice(i, i + 1).concat(newStr.slice(i, i + 1));
    }
    newStr = t;
  }
  let arr = [];
  // parseInt 的参数第一个前面加上0x表示转化成十六进制数，加上0表示转换成八进制
  for (let i = 0; i < 6; i += 2) {
    let s = newStr.slice(i, i + 2);
    arr.push(parseInt("0x" + s));
  }
  return "rgb(" + arr.join(",") + ")";
}
console.log(HEXAtoRGB("#ffffff"))
console.log(HEXAtoRGB("#fff"))