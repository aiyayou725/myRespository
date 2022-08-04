/**
 * 选择一个递减的增量序列
 * 按增量序列的个数k，对序列进行k趟排序
 * 每趟排序，根据对应的增量，将序列分成若干子序列，分别对每个子序列插入排序
 */


//时间复杂度（平均）：O（n^1.3）
//时间复杂度（最坏）：O（n^2）
//时间复杂度（最好）：O（n）
//空间复杂度（）：O（1）

const nums = [8, 6, 41, 12, 8, 23, 15, 17, 22, 35, 89];
function shellSort(nums) {
  let gap = Math.floor(nums.length / 2)
  while (gap >= 1) {
    for (let i = gap; i < nums.length; i++){
      let cur = nums[i]
      let j = i
      while (j > gap - 1 && nums[j - gap] > cur) {
        nums[j] = nums[j - gap]
        j -= gap
      }
      nums[j] = cur
    }
    gap = Math.floor(gap / 2)
  }
  return nums
}

console.log(shellSort(nums))