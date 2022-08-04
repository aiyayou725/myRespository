// new Date(('2020-12-01'),  'yyyy/MM/dd')  ===>  2020/12/01
// new Date(('2020-04-01'),  'yyyy/MM/dd')  ===>  2020/04/01
// new Date(('2020-12-01'),  'yyyy年MM月dd日')  ===>  2020年12月01日

const dateFormat = (dateInput, format) => {
  let day = dateInput.getDate() < 9 ? '0' + dateInput.getDate() : dateInput.getDate()
  let month = dateInput.getMonth() + 1 < 9? '0' + (dateInput.getMonth() + 1) : dateInput.getMonth() + 1
  let year = dateInput.getFullYear()
  
  format = format.replace(/yyyy/, year)
  format = format.replace(/MM/, month)
  format = format.replace(/dd/, day)  

  return format
}

console.log(dateFormat(new Date('2020-12-01'),  'yyyy/MM/dd'));
console.log(dateFormat(new Date('2020-04-01'),  'yyyy/MM/dd'));
console.log(dateFormat(new Date('2020-12-01'),  'yyyy年MM月dd日'));