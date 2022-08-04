Array.prototype.myflat = function (depth) {
  if (!Array.isArray(this) || depth < 0) {
    return [this];
  }
  let res = []
  for (let i = 0; i < this.length; i++){
    res = res.concat(Array.isArray(this[i]) ? this[i].myflat(depth-1) : this[i]);
  }
  return res;
}

console.log([1,[2, [3, [4, 5]]]].myflat(2));
console.log([1,[2, [3, [4, 5]]]].flat(2));
console.log([1,[2, [3, [4, 5]]]].myflat(5));
console.log([1,[2, [3, [4, 5]]]].flat(5));
console.log([1,[2, [3, [4, 5]]]].myflat(Infinity));
console.log([1, [2, [3, [4, 5]]]].flat(Infinity));

