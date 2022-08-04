String.prototype.repeat2 = function (count) {
  let str = ''
  for (let i = 0; i < count; i++){
    str += this
  }
  return str 
}

console.log(" ddw".repeat(3))
