/** 设计并实现一个满足LRU（最近最少使用）缓存的约束的数据结构 LRUCache 类
    * LRUCache 以正整数为容量 capacity 初始化 LRU 缓存
    * get(key) 如果关键字存在于缓存中，则返回关键字的值，否则返回-1
    * put(key, value) 如果关键字已经存在，则变更其数据值 value；如果不存在就想缓存中插入该组 key-value， 
      如果插入操作导致关键字数量超过 capacity 就逐出最久未使用的关键字
 *  函数 get 和 put 必须以 O(1) 的平均时间复杂度运行
 */

class Node {
  constructor(key, value) {
    this.key = key
    this.value = value
  }
}
// 创建一个双向链表，来实现get和put的O(1)时间复杂度
class DoubleList {
  constructor() {
    this.head = new Node(0, 0)
    this.tail = new Node(0, 0)
    this.head.next = this.tail
    this.tail.prev = this.head
    this.size = 0
  }

  // 向双向链表中加入数据，因为新加入的数据是新数据，应该放在链表尾部，这样删除链表数据的时候直接删除头部就是删除的最近最少使用
  addLast(node) {
    node.prev = this.tail.prev
    node.next = this.tail
    this.tail.prev.next = node
    this.tail.prev = node
    this.size++ 
  }
  // 移除链表中的某一个节点
  removeNode(node) {
    node.prev.next = node.next
    node.next.prev = node.prev
    this.size--
    return node.key
  }

  // 移除链表的第一个节点（删除最长时间未使用，存储空间达到阈值）
  removeFirst() {
    if (this.head.next === this.tail) {
      return null
    }
    return this.removeNode(this.head.next)
  }
}


const LRUCache = function (capacity) {
  this.hash = new Map()
  this.cache = new DoubleList()
  this.capacity = capacity
}

// get 说明使用了数据
// 在cache中需要最近使用过的数据放在最后
LRUCache.prototype.get = function (key) {
  if (this.hash.has(key)) {
    let moveNode = this.hash.get(key)
    this.cache.removeNode(moveNode)
    this.cache.addLast(moveNode)
    return this.hash.get(key).value
  } else {
    return -1
  }
}

LRUCache.prototype.put = function (key, value) {
  if (this.hash.has(key)) {
    let changeValue = this.hash.get(key)
    this.cache.removeNode(changeValue)
  }
  if (this.cache.size === this.capacity) {
    let deleted = this.cache.removeFirst()
    this.hash.delete(deleted)
  }
  let newNode = new Node(key, value)
  this.hash.set(key, newNode)
  this.cache.addLast(newNode)
}