// 快速排序是对冒泡排序的改进
/**
 通过多次比较和交换来实现排序
  * 首先设定一个分界值，通过该分界值将数组分成左右两部分
  * 将大于或等于分界值的数据集中到数组右边，小于分界值的数据集中到数组左边
  * 左右两边独立排序
  * 重复上述过程
 */

    // 时间复杂度（平均）：O（nlog2 n）
    // 时间复杂度（最坏）：O（n^2）
    // 时间复杂度（最好）：O（nlog2 n）
    // 空间复杂度（）：O（log2 n）

const nums = [8, 6, 41, 12, 8, 23, 15, 17, 22, 35, 89];
function quickSort(nums) {
  const quick = (nums, left, right) => {
    if (left >= right) return;
    // 选择数组第一项为分界值
    let i = left, j = right, flag = left;
    while (i < j) {
      while (nums[j] >= nums[flag] && j > flag) j--;
      if (i >= j) break;
      while (nums[i] <= nums[flag] && i < j) i++;
      [nums[flag], nums[j], nums[i]] = [nums[j], nums[i], nums[flag]];
      flag = i;
    }
    quick(nums, left, flag - 1)
    quick(nums, flag + 1, right);
  }
  quick(nums, 0, nums.length - 1)
}
console.log(nums)
quickSort(nums)
console.log(nums)
