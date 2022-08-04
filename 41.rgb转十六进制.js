function RGBtoHexa(s) {
  let colorArr = s.replace(/(rgb\()|(\))/g, "")
    .split(",");
  console.log(colorArr);
  let str = "";
  for (let i = 0; i < colorArr.length; i++){
    str += (parseInt(colorArr[i])).toString(16).slice(-2);
  }

  return "#" + str;
}
console.log(RGBtoHexa("rgb(255,255,255)"))