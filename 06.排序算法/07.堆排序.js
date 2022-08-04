//时间复杂度（平均）：O（nlog2 n）
//时间复杂度（最坏）：O（n^2）
//时间复杂度（最好）：O（nlog2 n）
//空间复杂度（）：O（1）
//稳定性：不稳定

// 初始化化堆 是从非叶子结点从后往前进行调整为堆，而后序的堆调整 都是从下标为0处开始调整为堆。
// 因为起初的完全二叉树是完全无效的，所有只能从后往前调整。在初始化完堆之后，
// 尽管将最值移动到尾部，打乱了堆，因为原来的堆结构已经基本形成，

//1、调整为大顶堆或者小顶堆
//2、将堆的第一个和最后一个互换
//3、调整打乱后的堆
//重复1、2、3

const nums = [8, 6, 41, 12, 8, 23, 15, 17, 22, 35, 89];

var len;    // 因为声明的多个函数都需要数据长度，所以把len设置成为全局变量
 
function buildMaxHeap(arr) {   // 建立大顶堆
    len = arr.length;
    for (var i = Math.floor(len/2); i >= 0; i--) {
        heapify(arr, i);
    }
}
 
function heapify(arr, i) {     // 堆调整
    var left = 2 * i + 1,
        right = 2 * i + 2,
        largest = i;
 
    if (left < len && arr[left] > arr[largest]) {
        largest = left;
    }
 
    if (right < len && arr[right] > arr[largest]) {
        largest = right;
    }
 
    if (largest != i) {
        swap(arr, i, largest);
        heapify(arr, largest);
    }
}
 
function swap(arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
 
function heapSort(arr) {
    buildMaxHeap(arr);
 
    for (var i = arr.length - 1; i > 0; i--) {
        swap(arr, 0, i);
        len--;
        heapify(arr, 0);
    }
    return arr;
}

console.log(heapSort(nums))
