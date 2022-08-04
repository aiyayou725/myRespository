function generateColor() {
  let str = "#";
  const color = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
  for (let i = 0; i < 6; i++){
    let index = parseInt(Math.random() * 16)
    str += color[index];
  }
  return str;
}

console.log(generateColor())
console.log(generateColor())
console.log(generateColor())