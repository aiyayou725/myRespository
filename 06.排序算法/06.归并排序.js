// 基于分治法，先使每个子序列有序，将已有序的子序列合并，得到完全有序的序列
// 时间复杂度O(nlogn) 空间复杂度T(n)
const nums = [8, 6, 41, 12, 8, 23, 15, 17, 22, 35, 89];
function mergeSort(nums) {
  if (nums.length <= 1) return nums
  const merge = (left, right) => {
    const res = [];
    while (left.length > 0 && right.length > 0) {
      if (left[0] < right[0]) {
        res.push(left.shift())
      } else {
        res.push(right.shift())
      }
    }
    return res.concat(left).concat(right)
  }

  let mid = Math.floor(nums.length / 2);
  let left = nums.slice(0, mid);
  let right = nums.slice(mid)
  return merge(mergeSort(left), mergeSort(right));
}

console.log(mergeSort(nums))

