// \s 表示空白字符
function hexify(color) {
  const colorArr = color
    .replace(/rgba?\(/, '')
    .replace(/\)/, '')
    .replace(/[\s+]/g, '')
    .split(',');
  
  let a = parseFloat(colorArr[3] || 1),
      r = Math.floor(a * parseInt(colorArr[0]) + (1 - a) * 255),
      g = Math.floor(a * parseInt(colorArr[1]) + (1 - a) * 255),
      b = Math.floor(a * parseInt(colorArr[2]) + (1 - a) * 255);
  return "#" +
    ('0' + r.toString(16)).slice(-2) +
    ('0' + g.toString(16)).slice(-2) +
    ('0' + b.toString(16)).slice(-2);
}
 
var myHex = hexify('rgba(241,148,138,0.5)'); 
console.log(myHex)
