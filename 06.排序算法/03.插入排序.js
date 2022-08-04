// 假设前k-1项是有序的，寻找前k-1项中第一个比k小的值，把他插在后面

//时间复杂度（平均）：O（n^2）
//时间复杂度（最坏）：O（n^2）
//时间复杂度（最好）：O（n）
//空间复杂度（）：O（1）
const nums = [8, 6, 41, 12, 8, 23, 15, 17, 22, 35, 89];
function insertionSort(nums) {
  for (let i = 1; i < nums.length; i++){
    let j = i
    let cur = nums[i]
    while (j > 0 && nums[j - 1] > cur) {
      nums[j] = nums[j - 1]
      j--
    }
    nums[j] = cur
  }
  return nums
}
console.log(insertionSort(nums))