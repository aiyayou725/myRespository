// 每一轮比较选出最小值，然后交换第一项和最小值
//时间复杂度（平均）：O（n^2）
//时间复杂度（最坏）：O（n^2）
//时间复杂度（最好）：O（n^2）
//空间复杂度（）：O（1）
const nums = [8, 6, 41, 12, 8, 23, 15, 17, 22, 35, 89];

function selectionSort(nums) {
  for (let i = 0; i < nums.length - 1; i++){
    let curMin = i;
    for (let j = i + 1; j < nums.length; j++){
      if (nums[j] < nums[curMin]) {
        curMin = j;
      }
    }
    [nums[i], nums[curMin]] = [nums[curMin], nums[i]]
  }
  return nums;
}

console.log(selectionSort(nums))
