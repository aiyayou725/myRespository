// https://blog.csdn.net/qq_39903567/article/details/115638973
//时间复杂度（平均）：O（n^2）
//时间复杂度（最坏）：O（n^2）
//时间复杂度（最好）：O（n）
//空间复杂度（）：O（1）

const nums = [8, 6, 41, 12, 8, 23, 15, 17, 22, 35, 89];

function bubbleSort(nums) {
  for (let i = nums.length - 1; i >= 0; i--) {
    for (let j = 0; j < i; j++){
      if (nums[j] > nums[j + 1]) {
        [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]]
      }
    }
  }
  return nums
}

console.log(bubbleSort(nums))