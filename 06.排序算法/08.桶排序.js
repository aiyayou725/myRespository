//时间复杂度（平均）：O（n+k）
//时间复杂度（最坏）：O（n^2）
//时间复杂度（最好）：O（n）
//空间复杂度（）：O（n+k）
const nums = [8, 6, 41, 12, 8, 23, 15, 17, 22, 35, 89];
function bucketSort(arr, bucketSize) {//数组、桶的大小（可不输入，有默认值5）
  if (arr.length === 0) {
    return arr;
  }

  var i;
  var minValue = arr[0];
  var maxValue = arr[0];
  for (i = 1; i < arr.length; i++) { 
    if (arr[i] < minValue) {
        minValue = arr[i];                // 输入数据的最小值
    } else if (arr[i] > maxValue) {
        maxValue = arr[i];                // 输入数据的最大值
    }
  }

  // 桶的初始化
  var DEFAULT_BUCKET_SIZE = 5;            // 设置桶的默认大小为5
  bucketSize = typeof bucketSize != 'number' ? DEFAULT_BUCKET_SIZE : bucketSize;
  var bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;  //Math.floor（）：向下舍入；取得桶的数量
  var buckets = new Array(bucketCount);
  for (i = 0; i < buckets.length; i++) {
      buckets[i] = [];
  }

  // 利用映射函数将数据分配到各个桶中
  for (i = 0; i < arr.length; i++) {
      buckets[Math.floor((arr[i] - minValue) / bucketSize)].push(arr[i]);
  }

  arr.length = 0;
  for (i = 0; i < buckets.length; i++) {
      console.log(buckets[i]);
      insertionSort(buckets[i]);                      // 对每个桶进行排序，这里使用了插入排序
      for (var j = 0; j < buckets[i].length; j++) {
          arr.push(buckets[i][j]);                     
      }
  }

  return arr;
}


function insertionSort(arr) {
  var len  = arr.length;
  var preIndex, //前面有序队列中用以比较的下标
   current;//后面乱序中提出来，用以比较的数
  for(var i = 1; i<len ; i++){
      preIndex = i - 1;
      current = arr[i];
      while(preIndex >= 0 && arr[preIndex] > current){
          arr[preIndex + 1] =arr[preIndex]; //向右移动
          preIndex--;
      }
      arr[preIndex + 1] = current;
  }
  return arr;
}

console.log("---------------------------------------------------")
console.log(bucketSort(nums))
console.log(bucketSort([1, 20, 3, 40, 5, 60, 7, 80, 90, 9, 92, 93]))